import { videoCourses } from '../video-data.js';

const results = [];
const wangdao408 = new Set(['wangdaoDS', 'wangdaoCO', 'wangdaoOS', 'wangdaoCN']);
for (const [key, item] of Object.entries(videoCourses)) {
  const bvid = new URL(item.url).pathname.split('/')[2];
  try {
    const response = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, { signal: AbortSignal.timeout(12000) });
    const payload = response.ok ? await response.json() : {};
    const ok = response.ok && payload.code === 0 && payload.data?.bvid === bvid && (!wangdao408.has(key) || payload.data?.owner?.name === '王道计算机教育');
    results.push({ key, bvid, ok, status: response.status, code: payload.code, title: payload.data?.title, uploader: payload.data?.owner?.name, parts: payload.data?.pages?.length });
  } catch (error) { results.push({ key, bvid, ok: false, error: error.message }); }
  await new Promise(resolve => setTimeout(resolve, 120));
}
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), passed: results.filter(item => item.ok).length, total: results.length, results }, null, 2));
if (results.some(item => !item.ok)) process.exitCode = 1;
