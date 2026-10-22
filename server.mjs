import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { generateResumeWithAI, listResumeModels } from './resume-ai.mjs';
import { ResumeAIError } from './resume-ai-core.js';
const root = fileURLToPath(new URL('.', import.meta.url));
try { process.loadEnvFile(path.join(root, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw new Error('Unable to load local environment configuration'); }
const port = Number(process.env.PORT || 4173);
const publicFiles = new Set(['index.html', 'style.css', 'app.js', 'data.js', 'core.js', 'career-data.js', 'career-ui.js', 'project-data.js', 'project-ui.js', 'professional-data.js', 'growth-core.js', 'growth-ui.js', 'growth.css', 'favicon.svg']);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml' };
const fileAliases = { 'vendor/jspdf.umd.min.js': 'node_modules/jspdf/dist/jspdf.umd.min.js', 'vendor/fflate.browser.js': 'node_modules/fflate/esm/browser.js' };
['resume-core.js', 'resume-ui.js', 'resume-export.js', 'resume-ai-core.js', 'resume-templates.js', 'mobility-data.js', 'resume.css', ...Object.keys(fileAliases)].forEach(name => publicFiles.add(name));
function json(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(body)); }
function readJSON(req) {
  return new Promise((resolve, reject) => {
    let length = 0, rejected = false; const chunks = [];
    const tooLarge = () => { rejected = true; reject(new ResumeAIError('REQUEST_TOO_LARGE', '简历内容过长，请精简后重试。', 413)); };
    if (Number(req.headers['content-length']) > 384 * 1024) tooLarge();
    req.on('data', chunk => { length += chunk.length; if (rejected) return; if (length > 384 * 1024) { tooLarge(); return; } chunks.push(chunk); });
    req.on('end', () => { if (rejected) return; try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new ResumeAIError('INVALID_JSON', '请求格式错误，请刷新页面后重试。', 400)); } });
    req.on('error', () => reject(new ResumeAIError('INVALID_REQUEST', '请求被中断，请重试。', 400)));
  });
}
export function createSiteServer({ generateResume = generateResumeWithAI, listModels = listResumeModels } = {}) {
  let activeGenerations = 0;
  return http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/resume/models') {
      if (req.method !== 'GET') { json(res, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: '请求方法不支持。' } }); return; }
      try { json(res, 200, await listModels()); }
      catch { json(res, 503, { error: { code: 'AI_MODELS_UNAVAILABLE', message: '暂时无法获取模型列表，请稍后重试。' } }); }
      return;
    }
    if (url.pathname === '/api/resume/generate') {
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); json(res, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: '请使用页面中的生成按钮。' } }); return; }
      const host = req.headers.host || '';
      if (!/^(?:127\.0\.0\.1|localhost)(?::\d+)?$/.test(host) || (req.headers.origin && req.headers.origin !== 'http://' + host)) { json(res, 403, { error: { code: 'ORIGIN_REJECTED', message: '仅接受当前网站发起的简历请求。' } }); return; }
      if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) { json(res, 415, { error: { code: 'INVALID_CONTENT_TYPE', message: '请求格式错误，请刷新页面后重试。' } }); return; }
      if (activeGenerations >= 2) { json(res, 429, { error: { code: 'AI_BUSY', message: '正在生成其他简历，请稍后再试。' } }); return; }
      activeGenerations++;
      const controller = new AbortController();
      res.once('close', () => { if (!res.writableEnded) controller.abort(); });
      try { const input = await readJSON(req); const result = await generateResume(input, { signal: controller.signal }); if (!res.destroyed) json(res, 200, result); }
      catch (error) { if (!res.destroyed) json(res, error instanceof ResumeAIError ? error.status : 502, { error: { code: error instanceof ResumeAIError ? error.code : 'AI_ERROR', message: error instanceof ResumeAIError ? error.message : 'AI 生成暂不可用，请重试或使用本地排版。' } }); }
      finally { activeGenerations--; }
      return;
    }
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {'Allow':'GET, HEAD'}); res.end(); return; }
    const name = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    if (!publicFiles.has(name)) { res.writeHead(404); res.end('Not found'); return; }
    const body = await readFile(path.join(root, fileAliases[name] || name));
    res.writeHead(200, {'Content-Type':types[path.extname(name)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(400); res.end('Bad request'); }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) createSiteServer().listen(port, '127.0.0.1', () => console.log(`知序已启动：http://127.0.0.1:${port}`));
