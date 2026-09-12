// Tiny static server for local play. Sends no-cache headers so edits show up on plain reload.
import http from 'http'; import fs from 'fs'; import path from 'path';
const root = path.dirname(new URL(import.meta.url).pathname), port = parseInt(process.argv[2] || '8791', 10);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.md': 'text/markdown; charset=utf-8', '.png': 'image/png' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p === '/') p = '/index.html';
  const file = path.join(root, path.normalize(p));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`zen-garden on http://localhost:${port}`));
