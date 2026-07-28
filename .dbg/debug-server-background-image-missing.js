import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const session = "background-image-missing";
const outdir = path.resolve(".dbg");
const logFile = path.join(outdir, `trae-debug-log-${session}.ndjson`);
const envFile = path.join(outdir, `${session}.env`);
const host = "127.0.0.1";
const startPort = 7777;
const maxRetries = 10;

fs.mkdirSync(outdir, { recursive: true });
fs.writeFileSync(logFile, "");

function boot(port, tries) {
  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method === "POST" && req.url === "/event") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body || "{}");
          if (!data.ts) data.ts = Date.now();
          fs.appendFileSync(logFile, `${JSON.stringify(data)}\n`);
          res.statusCode = 200;
          res.end("ok");
        } catch {
          res.statusCode = 400;
          res.end("bad json");
        }
      });

      return;
    }

    if (req.method === "GET" && req.url === "/health") {
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, session }));
      return;
    }

    res.statusCode = 404;
    res.end("not found");
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && tries < maxRetries) {
      boot(port + 1, tries + 1);
      return;
    }

    console.error(err);
    process.exit(1);
  });

  server.listen(port, host, () => {
    const api = `http://${host}:${port}/event`;

    fs.writeFileSync(envFile, `DEBUG_SERVER_URL=${api}\nDEBUG_SESSION_ID=${session}\n`);

    console.log("@@DEBUG_SERVER_INFO");
    console.log(
      JSON.stringify(
        {
          api_url: api,
          session_id: session,
          log_dir: outdir,
          log_file: logFile,
          env_file: envFile,
        },
        null,
        2,
      ),
    );
    console.log("@@END_DEBUG_SERVER_INFO");
  });
}

boot(startPort, 0);
