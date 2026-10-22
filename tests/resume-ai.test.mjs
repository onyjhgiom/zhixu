import test from 'node:test';
import assert from 'node:assert/strict';
import { createResumeState } from '../resume-core.js';
import { createResumeAIRequest, createResumeAISource, validateResumeAIPlan, applyResumeAIPlan } from '../resume-ai-core.js';
import { generateResumeWithAI, listResumeModels } from '../resume-ai.mjs';

function candidate() {
  const state = createResumeState('game'); state.basics = { ...state.basics, name: '测试候选人', phone: '13800138000', email: 'person@example.com' };
  state.projects = [{ name: '联机演示', role: '开发者', details: '使用 Unity 实现网络同步，支持 2 名玩家协作。' }];
  state.skills = 'Unity、C#'; state.target.jd = '熟悉 Unity、C#，掌握网络同步';
  return state;
}
function planFor(source) {
  return { summary: source.summary, sections: source.sections.map(section => ({ id: section.id, items: section.items.map((item, index) => ({ index, bullets: item.bullets.map((bullet, index) => ({ text: bullet.text, sourceIndexes: [index] })) })) })), suggestions: ['补充真实验收记录。'] };
}
const env = { ANTHROPIC_BASE_URL: 'https://example.test/v1/', ANTHROPIC_AUTH_TOKEN: 'test-secret' };

test('AI request strips identity, contacts, photos, existing documents and embedded contact strings', () => {
  const state = candidate(); state.photo = 'data:image/png;base64,AAAA'; state.document = { secret: 'never send' }; state.projects[0].details += '联系 person@example.com 或 13800138000。';
  const request = createResumeAIRequest(state), json = JSON.stringify(request);
  for (const value of ['测试候选人', '13800138000', 'person@example.com', 'data:image', 'never send']) assert.ok(!json.includes(value));
  assert.ok(json.includes('Unity')); assert.ok(json.includes('[邮箱已隐藏]'));
});

test('AI plan applies phrasing while preserving identity, dates, titles, skill facts and local photo', () => {
  const state = candidate(); state.photo = 'data:image/png;base64,AAAA';
  const source = createResumeAISource(createResumeAIRequest(state)), plan = planFor(source);
  plan.sections[0].items[0].bullets[0].text = '基于 Unity 实现网络同步，支持 2 名玩家协作。';
  const result = applyResumeAIPlan(state, { plan, model: 'claude-fable-5-1' });
  assert.equal(result.document.name, state.basics.name); assert.equal(result.document.photo, state.photo);
  assert.ok(result.document.contacts.includes(state.basics.phone)); assert.match(result.document.sections[0].items[0].bullets[0].text, /^基于/);
  assert.equal(result.generation.mode, 'ai');
});

test('AI result validation rejects fabricated quantities, unsupported skills and dropped facts', () => {
  const source = createResumeAISource(createResumeAIRequest(candidate()));
  for (const text of ['使用 Unity 实现网络同步，支持 200 名玩家协作。', '使用 Unity 与 Redis 实现网络同步，支持 2 名玩家协作。', '使用 Unity 实现网络同步。']) {
    const plan = planFor(source); plan.sections[0].items[0].bullets[0].text = text;
    assert.throws(() => validateResumeAIPlan(source, plan), { code: 'INVALID_AI_RESULT' });
  }
  const plan = planFor(source); plan.sections.pop(); assert.throws(() => validateResumeAIPlan(source, plan));
});

test('AI cannot edit certificates or duplicate source indexes; disabled optimization keeps ordering', () => {
  const state = candidate(); state.certificates = '英语六级'; state.optimize = false;
  const source = createResumeAISource(createResumeAIRequest(state));
  let plan = planFor(source); plan.sections.reverse(); assert.throws(() => validateResumeAIPlan(source, plan));
  plan = planFor(source); plan.sections[0].items[0].bullets[0].sourceIndexes = [0, 0]; assert.throws(() => validateResumeAIPlan(source, plan));
  plan = planFor(source); plan.sections.at(-1).items[0].bullets[0].text = '英语八级'; assert.throws(() => validateResumeAIPlan(source, plan));
});

test('Messages API uses x-api-key, defaults to Fable 5.1 max effort and supports explicit Opus models', async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    const body = JSON.parse(options.body); calls.push({ url, options, body });
    return Response.json({ stop_reason: 'end_turn', content: [{ type: 'thinking', thinking: 'not a result' }, { type: 'text', text: JSON.stringify(planFor(JSON.parse(body.messages[0].content))) }] });
  };
  const raw = createResumeAIRequest(candidate());
  const first = await generateResumeWithAI(raw, { env, fetchImpl });
  assert.equal(first.model, 'claude-fable-5-1'); assert.equal(calls[0].url, 'https://example.test/v1/messages'); assert.equal(calls[0].options.headers['x-api-key'], 'test-secret');
  assert.equal(calls[0].body.output_config.effort, 'max'); assert.equal(calls[0].body.temperature, undefined);
  await generateResumeWithAI({ ...raw, model: 'claude-opus-5-5' }, { env, fetchImpl }); assert.equal(calls[1].body.model, 'claude-opus-5-5');
  assert.ok(!calls[0].options.body.includes('person@example.com'));
});

test('service errors are actionable and never expose upstream secrets or configuration', async () => {
  const raw = createResumeAIRequest(candidate());
  await assert.rejects(generateResumeWithAI(raw, { env: {}, fetchImpl: () => { throw new Error('should not call'); } }), { code: 'AI_NOT_CONFIGURED' });
  await assert.rejects(generateResumeWithAI(raw, { env, fetchImpl: async () => Response.json({ error: { message: 'test-secret internal account data' } }, { status: 403 }) }), error => !error.message.includes('test-secret') && error.code === 'AI_UPSTREAM_ERROR');
  await assert.rejects(generateResumeWithAI(raw, { env, fetchImpl: async () => Response.json({ stop_reason: 'max_tokens', content: [] }) }), { code: 'AI_INVALID_RESPONSE' });
  await assert.rejects(generateResumeWithAI({ ...raw, model: '../../secret' }, { env }), { code: 'INVALID_MODEL' });
  await assert.rejects(generateResumeWithAI(raw, { env, fetchImpl: async () => Response.json({ error: { message: 'No available accounts: this group only allows Claude Code clients' } }, { status: 503 }) }), { code: 'AI_CLIENT_REQUIRED' });
});

test('Sub2API Responses uses Bearer auth, stateless payload and extracts assistant output', async () => {
  const calls = [];
  const responseEnv = { RESUME_AI_PROTOCOL: 'responses', SUB2API_BASE_URL: 'https://response-example.test/v1', SUB2API_API_KEY: 'responses-secret', ANTHROPIC_MODEL: 'claude-sonnet-4-6' };
  const fetchImpl = async (url, options) => {
    calls.push({ url, options, body: JSON.parse(options.body) });
    const request = JSON.parse(calls[0].body.input[0].content[0].text);
    const text = JSON.stringify(planFor(request));
    return Response.json({ status: 'completed', output: [{ type: 'reasoning', summary: [] }, { type: 'message', role: 'assistant', content: [{ type: 'output_text', text }] }] });
  };
  const result = await generateResumeWithAI(createResumeAIRequest(candidate()), { env: responseEnv, fetchImpl });
  assert.equal(result.model, 'claude-sonnet-4-6'); assert.equal(calls[0].url, 'https://response-example.test/v1/responses');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer responses-secret');
  assert.equal(calls[0].body.store, false); assert.equal(calls[0].body.stream, false);
  assert.equal(calls[0].body.max_output_tokens, 16384); assert.equal(calls[0].body.instructions.includes('候选人真实经历'), true);
  await assert.rejects(generateResumeWithAI(createResumeAIRequest(candidate()), { env: responseEnv, fetchImpl: async () => Response.json({ error: { message: 'All available accounts exhausted' } }, { status: 403 }) }), { code: 'AI_ACCOUNTS_UNAVAILABLE' });
  await assert.rejects(generateResumeWithAI(createResumeAIRequest(candidate()), { env: responseEnv, fetchImpl: async () => Response.json({ error: { message: 'Upstream access forbidden, please contact administrator' } }, { status: 502 }) }), { code: 'AI_UPSTREAM_FORBIDDEN' });
});

test('model discovery chooses an available default when configured model is not in the pool', async () => {
  const modelEnv = { RESUME_AI_PROTOCOL: 'responses', SUB2API_BASE_URL: 'https://models-fallback.test/v1', SUB2API_API_KEY: 'model-fallback-test', ANTHROPIC_MODEL: 'claude-fable-5-1' };
  const result = await listResumeModels({ env: modelEnv, fetchImpl: async () => Response.json({ data: [{ id: 'claude-sonnet-4-6' }, { id: 'claude-opus-5-5' }] }) });
  assert.equal(result.defaultModel, 'claude-sonnet-4-6');
});

test('model discovery supports Claude series, pagination, filtering and caching', async () => {
  let calls = 0;
  const modelEnv = { ...env, ANTHROPIC_AUTH_TOKEN: 'model-discovery-test' };
  const fetchImpl = async url => { calls++; return Response.json(url.includes('after_id') ? { data: [{ id: 'claude-opus-5-5' }, { id: 'gpt-other' }], has_more: false } : { data: [{ id: 'claude-fable-5-1' }], has_more: true, last_id: 'claude-fable-5-1' }); };
  const first = await listResumeModels({ env: modelEnv, fetchImpl }), second = await listResumeModels({ env: modelEnv, fetchImpl });
  assert.deepEqual(first.models.map(item => item.id), ['claude-fable-5-1', 'claude-opus-5-5']); assert.equal(calls, 2); assert.deepEqual(first, second);
});
