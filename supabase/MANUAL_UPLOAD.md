## Subida manual para o Supabase

Arquivos gerados:

- `supabase/migrations/seed_local_content.sql`
- `supabase/manual-assets-manifest.json`

### 1. Popular o banco

1. Abra o projeto no painel do Supabase.
2. Entre em `SQL Editor`.
3. Cole o conteudo de `supabase/migrations/seed_local_content.sql`.
4. Execute o SQL.

### 2. Enviar as imagens para o bucket

1. Abra `Storage`.
2. Entre no bucket publico `story-images`.
3. Crie as pastas `stories/` e `categories/` se ainda nao existirem.
4. Use `supabase/manual-assets-manifest.json` como referencia para subir os arquivos locais para os caminhos `bucketPath`.

### 3. Observacoes

- O app continua em modo local por enquanto.
- As capas das historias no SQL sao gravadas com a URL publica do bucket quando `VITE_SUPABASE_URL` estiver presente no `.env`.
- A tabela `categories` atual nao possui coluna de imagem, entao as imagens de categoria ficam apenas preparadas no manifest para uso futuro.
