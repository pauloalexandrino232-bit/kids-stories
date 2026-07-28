import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const storiesFile = resolve(rootDir, "src/lib/stories-legacy.ts");
const localContentFile = resolve(rootDir, "src/lib/local-content.ts");
const storiesAssetDir = resolve(rootDir, "public/stories");
const categoriesAssetDir = resolve(rootDir, "public/categories");
const supabaseDir = resolve(rootDir, "supabase");
const migrationsDir = resolve(supabaseDir, "migrations");
const outputSqlFile = resolve(migrationsDir, "seed_local_content.sql");
const outputManifestFile = resolve(supabaseDir, "manual-assets-manifest.json");

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((acc, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return acc;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        return acc;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, "");

      acc[key] = value;
      return acc;
    }, {});
}

function loadLegacyStories() {
  const source = readFileSync(storiesFile, "utf8")
    .replace(/^\s*import .*?;\r?\n/gm, "")
    .replace(
      /export const legacyStories:\s*Story\[\]\s*=/,
      "const legacyStories =",
    )
    .replace(
      /export function getLegacyStory\(id:\s*string\)/,
      "function getLegacyStory(id)",
    )
    .concat("\nmodule.exports = { legacyStories };\n");

  const module = { exports: {} };
  const context = vm.createContext({ module, exports: module.exports });
  new vm.Script(source, { filename: storiesFile }).runInContext(context);
  return module.exports.legacyStories;
}

function loadLocalContent(legacyStories) {
  const source = readFileSync(localContentFile, "utf8")
    .replace(/^\s*import .*?;\r?\n/gm, "")
    .replace(
      /export const localCategories:\s*Category\[\]\s*=/,
      "const localCategories =",
    )
    .replace(/export const localStories:\s*Story\[\]\s*=/, "const localStories =")
    .replace(
      /export const localStoryPages:\s*StoryPage\[\]\s*=/,
      "const localStoryPages =",
    )
    .replace(
      /export function getLocalStory\(storyId:\s*string\)/,
      "function getLocalStory(storyId)",
    )
    .replace(
      /export function getLocalStoryPages\(storyId:\s*string\)/,
      "function getLocalStoryPages(storyId)",
    )
    .concat(
      "\nmodule.exports = { localCategories, localStories, localStoryPages };\n",
    );

  const module = { exports: {} };
  const context = vm.createContext({
    legacyStories,
    module,
    exports: module.exports,
  });
  new vm.Script(source, { filename: localContentFile }).runInContext(context);
  return module.exports;
}

function deterministicUuid(seed) {
  const hash = createHash("md5").update(seed).digest("hex");
  const part3 = `5${hash.slice(13, 16)}`;
  const variantNibble = ((Number.parseInt(hash[16], 16) & 0x3) | 0x8).toString(16);
  const part4 = `${variantNibble}${hash.slice(17, 20)}`;

  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${part3}-${part4}-${hash.slice(20, 32)}`;
}

function sqlString(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  const normalized = String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "''")
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");

  return `E'${normalized}'`;
}

function sqlBoolean(value) {
  return value ? "TRUE" : "FALSE";
}

function fileExistsIn(directory, pathValue) {
  if (!pathValue) {
    return false;
  }

  return existsSync(resolve(directory, basename(pathValue)));
}

function buildPublicUrl(baseUrl, bucketPath) {
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl.replace(/\/$/, "")}/storage/v1/object/public/story-images/${bucketPath}`;
}

function getNowSql(value) {
  return value ? sqlString(value) : "NOW()";
}

const env = parseEnvFile(resolve(rootDir, ".env"));
const supabaseUrl = env.VITE_SUPABASE_URL ?? "";
const legacyStories = loadLegacyStories();
const { localCategories, localStories, localStoryPages } = loadLocalContent(
  legacyStories,
);

const categoryNameMap = new Map(
  localCategories.map((category) => [category.id, category.name]),
);

const storyIdMap = new Map(
  localStories.map((story) => [story.id, deterministicUuid(`story:${story.id}`)]),
);

const storyCoverAssets = localStories
  .filter((story) => story.image)
  .map((story) => {
    const bucketPath = story.image.replace(/^\//, "");

    return {
      kind: "story-cover",
      localId: story.id,
      sourcePath: `public/${bucketPath}`,
      bucketPath,
      publicUrl: buildPublicUrl(supabaseUrl, bucketPath),
      exists: fileExistsIn(storiesAssetDir, story.image),
    };
  });

const categoryAssets = localCategories.map((category) => {
  const bucketPath = category.image.replace(/^\//, "");

  return {
    kind: "category-image",
    localId: category.id,
    sourcePath: `public/${bucketPath}`,
    bucketPath,
    publicUrl: buildPublicUrl(supabaseUrl, bucketPath),
    exists: fileExistsIn(categoriesAssetDir, category.image),
  };
});

const categoryRows = localCategories.map((category) => {
  return `  (${sqlString(category.name)}, ${sqlString(
    category.description ?? null,
  )}, NOW())`;
});

const storyRows = localStories.map((story) => {
  const storyId = storyIdMap.get(story.id);
  const categoryName = story.categoryId ? categoryNameMap.get(story.categoryId) : null;
  const categoryIdSql = categoryName
    ? `(SELECT id FROM public.categories WHERE name = ${sqlString(categoryName)})`
    : "NULL";
  const storyCoverUrl = story.image
    ? buildPublicUrl(supabaseUrl, story.image.replace(/^\//, "")) ?? story.image
    : null;

  return `  (${sqlString(storyId)}, ${sqlString(story.title)}, ${sqlString(
    story.description,
  )}, ${sqlString(storyCoverUrl)}, ${categoryIdSql}, ${sqlBoolean(
    story.isPublished,
  )}, ${getNowSql(story.createdAt)}, ${getNowSql(
    story.updatedAt,
  )})`;
});

const storyPageRows = localStoryPages.map((page) => {
  const pageId = deterministicUuid(`page:${page.storyId}:${page.pageNumber}`);
  const storyId = storyIdMap.get(page.storyId);

  return `  (${sqlString(pageId)}, ${sqlString(storyId)}, ${page.pageNumber}, ${sqlString(
    page.text,
  )}, ${sqlString(page.imageUrl ?? null)}, ${getNowSql(page.createdAt)})`;
});

const storyIdSqlList = [...storyIdMap.values()].map((id) => sqlString(id)).join(", ");

const sql = `-- Seed gerada a partir do catalogo local atual do Kids Stories.
-- O app continua em modo local; este arquivo apenas popula o Supabase.

BEGIN;

INSERT INTO public.categories (name, description, created_at)
VALUES
${categoryRows.join(",\n")}
ON CONFLICT (name) DO UPDATE
SET
  description = EXCLUDED.description;

INSERT INTO public.stories (
  id,
  title,
  description,
  cover_image,
  category_id,
  is_published,
  created_at,
  updated_at
)
VALUES
${storyRows.join(",\n")}
ON CONFLICT (id) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  cover_image = EXCLUDED.cover_image,
  category_id = EXCLUDED.category_id,
  is_published = EXCLUDED.is_published,
  updated_at = EXCLUDED.updated_at;

DELETE FROM public.story_pages
WHERE story_id IN (${storyIdSqlList});

INSERT INTO public.story_pages (
  id,
  story_id,
  page_number,
  text,
  image_url,
  created_at
)
VALUES
${storyPageRows.join(",\n")};

COMMIT;
`;

mkdirSync(migrationsDir, { recursive: true });

writeFileSync(outputSqlFile, sql, "utf8");
writeFileSync(
  outputManifestFile,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      supabaseUrl,
      bucket: "story-images",
      counts: {
        categories: localCategories.length,
        stories: localStories.length,
        storyPages: localStoryPages.length,
        storyCoverAssets: storyCoverAssets.length,
        categoryAssets: categoryAssets.length,
      },
      assets: [...storyCoverAssets, ...categoryAssets],
      missingAssets: [...storyCoverAssets, ...categoryAssets].filter(
        (asset) => !asset.exists,
      ),
    },
    null,
    2,
  ),
  "utf8",
);

const summary = {
  categories: localCategories.length,
  stories: localStories.length,
  storyPages: localStoryPages.length,
  storyCoverAssets: storyCoverAssets.length,
  categoryAssets: categoryAssets.length,
  missingAssets: [...storyCoverAssets, ...categoryAssets].filter(
    (asset) => !asset.exists,
  ).length,
  generatedSql: outputSqlFile,
  generatedManifest: outputManifestFile,
};

console.log(JSON.stringify(summary, null, 2));
