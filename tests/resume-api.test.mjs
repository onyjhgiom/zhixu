import test from 'node:test';
import assert from 'node:assert/strict';
import { createSiteServer } from '../server.mjs';
import { ResumeAIError } from '../resume-ai-core.js';

async function site(t, generateResume = async body => ({ plan: body, model: 'claude-fable-5-1' })) {
  const server = createSiteServer({ generateResume, listModels: async () => ({ defaultModel: 'claude-fable-5-1', models: [{ id: 'claude-fable-5-1' }, { id: 'claude-opus-5-5' }] }) });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return 'http://127.0.0.1:' + server.address().port;
}
test('site serves AI endpoints while keeping local configuration and server modules private', async t => {
  const base = await site(t);
  assert.equal((await fetch(base + '/api/resume/models').then(r => r.json())).models.length, 2);
  const response = await fetch(base + '/api/resume/generate', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ projects: [] }) });
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  for (const file of ['.env.local', '.env.example', 'resume-ai.mjs', 'server.mjs', 'package.json']) assert.equal((await fetch(base + '/' + file)).status, 404);
  assert.equal((await fetch(base + '/resume-ai-core.js')).status, 200);
});
test('API rejects cross origin, wrong methods, malformed JSON and oversized requests', async t => {
  let calls = 0; const base = await site(t, async () => { calls++; return {}; });
  const post = options => fetch(base + '/api/resume/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}', ...options });
  assert.equal((await fetch(base + '/api/resume/generate')).status, 405);
  assert.equal((await post({ headers: { 'Content-Type': 'application/json', Origin: 'https://another.test' } })).status, 403);
  assert.equal((await post({ headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await post({ body: 'invalid' })).status, 400);
  assert.equal((await post({ body: JSON.stringify({ text: 'a'.repeat(400000) }) })).status, 413);
  assert.equal(calls, 0);
});
test('API returns safe service errors and limits concurrent generation', async t => {
  const errorBase = await site(t, async () => { throw new ResumeAIError('AI_TIMEOUT', 'AI 生成超时', 504); });
  const failure = await fetch(errorBase + '/api/resume/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(failure.status, 504); assert.equal((await failure.json()).error.code, 'AI_TIMEOUT');
  let started = 0, release; const pending = new Promise(resolve => { release = resolve; });
  const base = await site(t, async () => { started++; await pending; return {}; });
  const post = () => fetch(base + '/api/resume/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  const requests = [post(), post()];
  while (started < 2) await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal((await post()).status, 429); release(); await Promise.all(requests);
});
