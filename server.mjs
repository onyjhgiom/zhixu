import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const publicFiles = new Set(['index.html', 'style.css', 'app.js', 'data.js', 'core.js', 'career-data.js', 'career-ui.js', 'project-data.js', 'project-ui.js', 'favicon.svg']);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml' };
http.createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {'Allow':'GET, HEAD'}); res.end(); return; }
  try {
    const url = new URL(req.url, 'http://localhost');
    const name = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    if (!publicFiles.has(name)) { res.writeHead(404); res.end('Not found'); return; }
    const body = await readFile(path.join(root, name));
    res.writeHead(200, {'Content-Type':types[path.extname(name)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`知序已启动：http://127.0.0.1:${port}`));
