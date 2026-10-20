import { createCareer } from './career-ui.js';
import { createProjects } from './project-ui.js';
import { paths, categories, resources, examTopics, examLinks, helpServices } from './data.js';
import { escapeHtml as e, matchesQuery, progressFor, sanitizeState, buildExamPlan } from './core.js';
let disposeHomeMotion = () => {};
let disposeFluidMotion = () => {};
let fluidSystem;
const icons = {
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  branch:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="19" r="2"/><path d="M6 7v10m0-6c8 0 12 0 12-3"/>',
  book:'<path d="M12 5C8 2 4 3 2 4v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-2-7-1-10 1Zm0 0v15"/>',
  cap:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v7"/>',
  bookmark:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 4h2m4 0h2m-8 3h2"/>',
  search:'<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
  arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
  external:'<path d="M14 3h7v7m0-7L10 14m0-10H4v16h16v-6"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>', menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  sprout:'<path d="M12 21v-9m0 3C5 16 2 11 3 6c5 0 9 3 9 9Zm0-4c0-6 4-9 9-8 0 6-3 9-9 8Z"/>',
  bot:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M2 12v4m20-4v4M8 17h8M8 11v2m8-2v2"/><circle cx="12" cy="2" r="1"/>',
  network:'<circle cx="12" cy="4" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M12 6v4m-2 3-5 3m9-3 5 3M6 18h12M5 16l6-10m8 10L13 6"/>',
  layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Zm7-1v4m-2-2h4"/>',
  sliders:'<path d="M5 3v5m0 4v9m7-18v10m0 4v4m7-18v3m0 4v11M2 8h6m1 9h6m1-11h6"/>',
  window:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20m-17-2h1m2 0h1m-2 6-3 2 3 2m10-4 3 2-3 2m-6-4-2 4"/>',
  server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M6 6.5h1m-1 11h1m4-11h7m-7 11h7"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  shield:'<path d="M12 3 3 7v6c0 4 4 7 9 9 5-2 9-5 9-9V7l-9-4Zm-5 9 3 3 7-7"/>',
  terminal:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 1h5"/>',
  chart:'<path d="M4 3v17h17M8 16v-5m5 5V6m5 10v-8"/>', check:'<path d="m5 12 4 4L20 5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  message:'<path d="M21 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9ZM7 8h10M7 12h6"/>',
  users:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8m3 10v-3a7 7 0 0 0-3-6"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>', file:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8m-8 4h6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.book}</svg>`;
const allItems = [...paths,...examTopics];
const itemById = id => allItems.find(p => p.id === id);
const storageKey = 'zhixu-learning-v1';
const validIds = new Set(allItems.map(p => p.id));
const counts = Object.fromEntries(allItems.map(p => [p.id,p.stages.length]));
let storageAvailable = true;
let state;
try { const raw = localStorage.getItem(storageKey); state = sanitizeState(raw ? JSON.parse(raw) : {}, validIds, counts, new Set(resources.map(r=>r.id))); }
catch { state = sanitizeState({},validIds,counts,new Set(resources.map(r=>r.id))); storageAvailable = false; }
let activeCategory = 'all', resourcePath = 'all', resourceLanguage = 'all', resourceLevel = 'all';
let lastFocus, toastTimer;
const dialog = document.getElementById('detail-dialog');
const content = document.getElementById('content');
const career=createCareer({paths,resources,resourceRow,icon,e,toast,go,closeDialog,exportFile});
const projectLab=createProjects({paths,icon,e,closeDialog});
const titles = {workspace:'我的学习空间',projects:'项目实践',interviews:'求职面试',home:'学习概览',tech:'技术成长',roadmaps:'学习路线',resources:'资料库',exam:'考研升学',support:'考研帮扶',learning:'我的学习',saved:'我的收藏',search:'搜索结果'};
function route() { return location.hash.slice(1).split('?')[0] || 'home'; }
function query() { return new URLSearchParams(location.hash.split('?')[1] || '').get('q') || ''; }
function toast(text) { const el=document.getElementById('toast'); el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3000); }
function persist() { try { localStorage.setItem(storageKey,JSON.stringify(state));storageAvailable=true;return true; } catch { storageAvailable=false;toast('浏览器未能保存记录，当前操作仅在本次页面停留期间有效。');return false; } }
function go(page) { if(location.hash === `#${page}`) render();else location.hash=page; }
function nav() {
  const primary=[['home','grid','学习概览'],['tech','code','技术成长'],['roadmaps','branch','学习路线'],['resources','book','资料库'],['projects','code','项目实践'],['interviews','users','求职面试'],['exam','cap','考研升学'],['support','users','考研帮扶']];
  const personal=[['workspace','grid','空间主页'],['learning','calendar','我的学习'],['saved','bookmark','我的收藏']];
  const link=([id,i,title])=>`<a href="#${id}" class="nav-item ${route()===id?'active':''}" ${route()===id?'aria-current="page"':''}>${icon(i)}<span>${title}</span>${id==='saved'&&state.saved.length?`<span class="nav-count">${state.saved.length}</span>`:''}</a>`;
  document.getElementById('main-nav').innerHTML=primary.map(link).join('');document.getElementById('personal-nav').innerHTML=personal.map(link).join('');document.getElementById('page-title').textContent=titles[route()] || titles.home;
  const profile=document.querySelector('.local-profile');
  profile.classList.toggle('active',route()==='workspace');
  if(route()==='workspace')profile.setAttribute('aria-current','page');else profile.removeAttribute('aria-current');
  profile.querySelector('.status-dot').title=storageAvailable?'记录保存在当前浏览器':'本次会话记录，浏览器暂时无法保存';
}
function tabs() { return `<div class="category-tabs" role="group" aria-label="筛选技术方向">${categories.map(c=>`<button class="tab ${c.id===activeCategory?'active':''}" data-category="${c.id}" aria-pressed="${c.id===activeCategory}">${c.name}</button>`).join('')}</div>`; }
function card(item, learning=false) {
  const progress=progressFor(item,state), joined=state.joined.includes(item.id), related=resources.filter(r=>r.paths.includes(item.id)).length;
  return `<article class="path-card ${learning?'learning-card':''}"><div class="card-top"><span class="tile-icon tone-${item.tone}">${icon(item.icon)}</span><span class="level">${item.level || '考研专业课'}</span></div><h3><button class="card-title" data-path="${item.id}">${item.title}</button></h3><p>${item.desc}</p>${learning?`<div class="progress-label"><span>${progress.count} / ${progress.total} 阶段已完成</span><span>${progress.percent}%</span></div><div class="small-progress"><span style="width:${progress.percent}%"></span></div>`:`<div class="tags">${(item.tags||['知识梳理','练习复盘']).map(t=>`<span class="tag">${t}</span>`).join('')}</div>`}<div class="card-footer"><span class="card-meta">${icon('branch')}${item.stages.length} 个学习阶段${related?`<span class="related-meta"> · ${related} 份资料</span>`:''}</span><button class="card-open" data-path="${item.id}">${joined?'继续学习':'查看路线'} ${icon('arrow')}</button></div>${learning?`<button class="remove-study" data-pause="${item.id}">暂停此路线</button>`:''}</article>`;
}
function resourceRow(r,showDesc=false) { const saved=state.saved.includes(r.id);return `<article class="resource-row"><div class="resource-type">${icon('file')}</div><div class="resource-body"><h3><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a></h3><p>${r.source} · ${r.type} <span class="resource-level">· ${r.level}</span>${!showDesc?' · '+r.lang:''}</p>${showDesc?`<p class="resource-desc">${r.desc}</p><p class="resource-practice">练习产出：${r.use}</p>`:''}</div><span class="resource-lang">${r.lang}</span><button class="icon-button ${saved?'is-saved':''}" data-save="${r.id}" aria-pressed="${saved}" aria-label="${saved?'取消收藏':'收藏'} ${r.title}">${icon('bookmark')}</button><a class="resource-open" href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="打开 ${r.title}（新标签页）"><span class="open-label">去学习</span>${icon('external')}</a></article>`; }
function empty(title,text,action='tech',label='探索学习方向') {return `<div class="empty-state">${icon('sprout')}<h3>${title}</h3><p>${text}</p><a class="btn btn-primary" href="#${action}">${label}${icon('arrow')}</a></div>`;}
function stats() { const entries=[['compass',paths.length,'条','技术学习路线'],['book',resources.length,'份','精选学习资料'],['layers',4,'门','408 专业课梳理'],['users',4,'类','考研帮扶方向']];return `<div class="overview-stats">${entries.map(([i,n,u,l])=>`<div class="stat-item"><div class="stat-icon">${icon(i)}</div><div class="stat-text"><b>${n}<small>${u}</small></b><span>${l}</span></div></div>`).join('')}</div>`;}
function art() { return `<div class="compute-art" aria-hidden="true"><div class="compute-topline"><span class="signal-dot"></span> NEURAL LEARNING ENGINE <span>LIVE / CS</span></div><div class="compute-scene"><div class="energy-well"></div><div class="energy-orbit orbit-one"><span><i></i><i></i></span></div><div class="energy-orbit orbit-two"><span><i></i><i></i></span></div><div class="energy-orbit orbit-three"><span><i></i><i></i></span></div><div class="core-scan"></div><svg class="circuit-map" viewBox="0 0 500 340" fill="none"><defs><linearGradient id="circuit-gradient" x1="0" y1="0" x2="500" y2="340" gradientUnits="userSpaceOnUse"><stop stop-color="#54e5d0"/><stop offset="1" stop-color="#858dff"/></linearGradient></defs><path class="circuit-wire" d="M250 170H112V83H52M250 170H386V72H450M250 170H100V268H46M250 170H397V258H455M250 170V35M250 170V316"/><path class="circuit-wire secondary-wire" d="M250 170H152V111H78M250 170H346V109H425M250 170V222H339V294M250 170V219H166V307"/><ellipse cx="250" cy="170" rx="115" ry="70" transform="rotate(-25 250 170)" stroke="url(#circuit-gradient)" opacity=".45"/><ellipse cx="250" cy="170" rx="139" ry="99" transform="rotate(-25 250 170)" stroke="url(#circuit-gradient)" opacity=".15" stroke-dasharray="3 8"/><g class="circuit-points"><circle cx="52" cy="83" r="4"/><circle cx="450" cy="72" r="4"/><circle cx="46" cy="268" r="4"/><circle cx="455" cy="258" r="4"/><circle cx="250" cy="35" r="3"/><circle cx="250" cy="316" r="3"/></g></svg><div class="orbital-ring"></div><div class="core-halo"></div><div class="compute-core"><span>CS</span><small>KNOWLEDGE CORE</small><i></i></div><div class="compute-node node-ai">${icon('bot')}<div><b>AI / AGENT</b><small>智能与模型</small></div></div><div class="compute-node node-engineer">${icon('code')}<div><b>ENGINEERING</b><small>构建与创造</small></div></div><div class="compute-node node-algorithm">${icon('network')}<div><b>ALGORITHM</b><small>逻辑与计算</small></div></div><div class="compute-node node-exam">${icon('cap')}<div><b>CS / 408</b><small>系统与基础</small></div></div><span class="scene-coordinate">[ 0x01 : LEARN → BUILD → EVOLVE ]</span></div><div class="hero-terminal"><div class="terminal-dots"><i></i><i></i><i></i><span>learning.config</span><span>UTF-8</span></div><div class="terminal-line"><span class="terminal-prompt">❯</span> start learning <span class="terminal-flag">--path your-future</span></div><div class="terminal-result"><span>✓</span> 探索 · 理解 · 实践 · 进阶 <span class="terminal-cursor"></span></div></div></div>`; }
function rail() {
  const active=itemById(state.joined.find(id=>progressFor(itemById(id),state).percent<100)) || itemById(state.joined[0]);
  const progress=active?progressFor(active,state):null;
  return `<aside class="rail" aria-label="学习快捷入口"><section class="panel"><h3 class="panel-title"><span class="left">${icon('calendar')}我的学习计划</span><span class="subtle-badge">${state.joined.length?'进行中':'待开启'}</span></h3>${active?`<div class="study-item"><h4>${active.title}</h4><p>下一步：${active.stages.find((_,i)=>!(state.done[active.id]||[]).includes(i))?.[0] || '全部完成，回顾一下收获吧'}</p><div class="progress-label"><span>${progress.count}/${progress.total} 阶段</span><span>${progress.percent}%</span></div><div class="small-progress"><span style="width:${progress.percent}%"></span></div></div><button class="btn btn-secondary full" data-path="${active.id}">继续学习 ${icon('arrow')}</button>`:`<div class="empty-study"><div class="study-art">${icon('book')}</div><strong>从一个小目标开始</strong><p>选择感兴趣的方向，开启你的第一条学习路线。</p></div><button class="btn btn-secondary full" data-action="guide">制定我的学习计划 ${icon('arrow')}</button>`}</section><section class="panel exam-promo"><div class="eyebrow">下一站，理想院校</div><h3>向理想院校<br>更近一步。</h3><p>知识梳理 · 复习规划 · 备考帮扶<br>把目标，拆解成每一天的行动。</p><a class="btn" href="#exam">进入考研专区 ${icon('arrow')}</a><div class="exam-decoration">${icon('cap')}</div></section><section class="panel notes-panel"><h3 class="panel-title"><span class="left">${icon('sprout')}一点学习建议</span></h3><ul class="notes-list"><li><div><strong>先走通一条小路线</strong>一个完成的项目，胜过无数个收藏。</div></li><li><div><strong>让知识发生连接</strong>技术学习与考研基础可以互相支持。</div></li><li><div><strong>记录自己的真实进度</strong>路线与收藏保存在当前浏览器。</div></li></ul></section></aside>`;
}
function home() {
  const date=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'long',day:'numeric',weekday:'long'}).format(new Date());
  const visible=paths.filter(p=>activeCategory==='all'||p.category===activeCategory).slice(0,6);
  return `<div class="welcome-row"><div><h1>你的下一次进阶，从这里开始。</h1><p>欢迎来到知序。连接知识、代码与下一种可能。</p></div><div class="date-line">${icon('calendar')}<span>${e(date)}</span></div></div><section class="hero" aria-label="探索计算机学习"><div><div class="eyebrow hero-eyebrow"><span class="signal-dot"></span> THE NEXT INTERFACE OF LEARNING <span class="hero-edition">VOL. 02</span></div><h2>以代码探索世界，<br>以技术<em>定义未来。</em></h2><p>从第一行代码，到下一代 AI。<br>让系统的学习路线，连接你的每一次突破。</p><div class="hero-domains"><span>AI & AGENT</span><span>FULL-STACK</span><span>CS FUNDAMENTALS</span></div><div class="hero-actions"><a class="btn btn-primary" href="#tech">探索技术方向 ${icon('arrow')}</a><a class="btn btn-secondary" href="#exam">${icon('cap')}开启考研之路</a></div><div class="hero-motion-controls"><span><i></i> INTERACTIVE KNOWLEDGE SPACE</span><button type="button" id="motion-toggle" aria-pressed="false">暂停动效 <span aria-hidden="true">Ⅱ</span></button></div></div>${art()}<div class="hero-aurora" aria-hidden="true"><i></i><i></i></div><div class="hero-light-sweep" aria-hidden="true"></div><canvas class="hero-network" aria-hidden="true"></canvas><div class="hero-spotlight" aria-hidden="true"></div></section>${stats()}${projectLab.preview()}${career.preview('agent')}<div class="content-columns"><div><section><div class="section-heading"><div><h2>发现你的技术方向</h2><p>从兴趣出发，让每一份努力都有方向。</p></div><a class="text-link" href="#tech">全部方向 ${icon('arrow')}</a></div>${tabs()}<div class="path-grid">${visible.map(p=>card(p)).join('')}</div></section><section class="resource-preview"><div class="section-heading"><div><h2>值得打开的好资料</h2><p>从开放课程与官方文档开始，边学边实践。</p></div><a class="text-link" href="#resources">查看资料库 ${icon('arrow')}</a></div><div class="resource-list">${[resources[0],resources[5],resources[10]].map(r=>resourceRow(r)).join('')}</div></section></div>${rail()}</div>`;
}
function technology(roadmap=false) {
  const list=paths.filter(p=>activeCategory==='all'||p.category===activeCategory);
  return `<div class="page-header"><div><div class="eyebrow">${roadmap?'LEARNING ROADMAPS':'EXPLORE YOUR DIRECTION'}</div><h1>${roadmap?'把目标，变成可走的路线。':'找到你想深入的方向。'}</h1><p>${roadmap?'每条路线都从基础开始，通过阶段任务走向实战。完成一个阶段，就为自己留下一个进步的标记。':'覆盖人工智能、研发工程、系统与安全、移动与交互、计算机基础与产品协作。从感兴趣的方向开始，逐步建立知识与实践能力。'}</p></div></div>${roadmap?`<div class="roadmap-intro"><div class="roadmap-step"><b>01</b><strong>选择一个方向</strong><p>结合已有基础与当前目标，先选一条路线。</p></div><div class="roadmap-step"><b>02</b><strong>完成阶段任务</strong><p>阅读资料、动手练习，留下可检查的成果。</p></div><div class="roadmap-step"><b>03</b><strong>记录与复盘</strong><p>标记阶段进度，再决定下一步深入哪里。</p></div></div>`:''}<div class="page-tools">${tabs()}<span class="result-count">${list.length} 条路线 · ${list.reduce((n,p)=>n+p.stages.length,0)} 个学习阶段</span></div><div class="path-grid">${list.map(p=>card(p)).join('')}</div>`;
}
function resourcePage(savedOnly=false) {
  const list=resources.filter(r=>(!savedOnly||state.saved.includes(r.id))&&(resourcePath==='all'||r.paths.includes(resourcePath))&&(resourceLanguage==='all'||r.lang===resourceLanguage)&&(resourceLevel==='all'||r.level===resourceLevel));
  return `<div class="page-header resource-page-header"><div><div class="eyebrow">${savedOnly?'YOUR KNOWLEDGE SHELF':'A GOOD PLACE TO START'}</div><h1>${savedOnly?'把值得学的，留在手边。':'好资料，让学习少绕一点路。'}</h1><p>${savedOnly?'收藏感兴趣的资料，再给它一个真正开始阅读的时间。记录保存在当前浏览器。':`共 ${resources.length} 份资料，其中 ${resources.filter(r=>r.lang==='中文').length} 份为中文入口，覆盖全部 ${paths.length} 个方向。资料在来源网站打开，附学习阶段与练习建议。`}</p></div>${!savedOnly?`<button class="btn btn-secondary resource-language-shortcut" data-resource-language="${resourceLanguage==='中文'?'all':'中文'}">${icon('book')}${resourceLanguage==='中文'?'查看全部语言':'只看中文资料'}</button>`:''}</div><div class="resource-toolbar"><select id="resource-path" class="field-control" aria-label="按技术方向筛选资料"><option value="all">全部技术方向</option>${paths.map(p=>`<option value="${p.id}" ${resourcePath===p.id?'selected':''}>${p.title}</option>`).join('')}</select><select id="resource-language" class="field-control" aria-label="按资料语言筛选"><option value="all">全部语言</option><option ${resourceLanguage==='中文'?'selected':''}>中文</option><option ${resourceLanguage==='英文'?'selected':''}>英文</option></select><select id="resource-level" class="field-control" aria-label="按学习阶段筛选"><option value="all">全部学习阶段</option>${['入门','进阶','高阶'].map(x=>`<option ${resourceLevel===x?'selected':''}>${x}</option>`).join('')}</select><span class="result-count">${list.length} 份资料</span></div>${list.length?`<div class="resource-list">${list.map(r=>resourceRow(r,true)).join('')}</div>`:empty(savedOnly?'这里还没有符合条件的收藏':'没有符合筛选条件的资料','试试调整筛选条件，或到资料库发现更多学习入口。','resources','浏览学习资料')}<p class="privacy-line">资料版权归原作者或发布方所有。课程内容与访问条件以来源网站为准。</p>`;
}
function planView(plan) {
  const result=buildExamPlan(plan);let start=1;
  return `<h4>${result.weeks} 周复习草案 · 每天约 ${result.hours} 小时</h4>${result.phases.map((phase,i)=>{const from=start;start+=phase.weeks;return `<div class="plan-phase"><span class="phase-number">0${i+1}</span><div><strong>第 ${from}–${start-1} 周 · ${phase.name}</strong><p>${phase.focus}</p></div></div>`;}).join('')}<h4>每日时间分配参考</h4><div class="daily-split">${result.daily.map(d=>`<span>${d.name} · ${d.hours}h</span>`).join('')}</div><p class="privacy-line">这是按固定比例生成的初始草案，需结合考试科目、基础和自测结果调整。不考数学时，请重新分配相应时间。</p><button class="export-link" data-action="export-plan">${icon('download')} 导出复习计划</button>`;
}
function examPage() {
  const plan=state.plan || {weeks:24,hours:4,subject:'408'};
  return `<div class="page-header"><div><div class="eyebrow">YOUR NEXT CHAPTER</div><h1>奔向目标，也照顾每一步。</h1><p>从专业课框架、复习规划到择校与复试准备，让考研这件大事有清楚的起点。</p></div><a href="#support" class="btn btn-secondary">了解备考帮扶 ${icon('arrow')}</a></div><div class="exam-banner"><div><h2>先搭框架，再一点点填满。</h2><p>把知识点连成体系，把复习计划落实到每一天。</p></div><div class="banner-symbol">${icon('book')}${icon('cap')}</div></div><div class="section-heading"><div><h2>408 专业课知识梳理</h2><p>本站原创学习提纲，可加入路线记录进度。</p></div></div><div class="exam-subjects">${examTopics.map(t=>`<button class="subject-card" data-path="${t.id}"><span class="tile-icon tone-${t.tone}">${icon(t.icon)}</span><h3>${t.title}</h3><p>${t.desc}</p><span class="text-link">查看复习提纲 ${icon('arrow')}</span></button>`).join('')}</div><div class="notice">${icon('info')}<span>此处以 408 常见知识领域组织学习提纲，并非当年考试大纲。目标专业可能采用自命题，考试科目、范围及招生要求请核对当年研招网与院校官方招生简章。</span></div><div class="exam-layout"><section class="planner"><h3>给复习一个可执行的起点</h3><p>填入可用时间，生成一份可以继续调整的阶段草案。</p><form id="plan-form"><div class="form-grid"><label class="form-field">复习周期（周）<input name="weeks" type="number" min="4" max="52" step="1" value="${plan.weeks}" required></label><label class="form-field">每天可用时间（小时）<input name="hours" type="number" min="1" max="12" step="0.5" value="${plan.hours}" required></label><label class="form-field span-2">专业课类型<select name="subject"><option value="408" ${plan.subject==='408'?'selected':''}>408 计算机学科专业基础</option><option value="custom" ${plan.subject==='custom'?'selected':''}>院校自命题专业课</option></select></label></div><button class="btn btn-primary" type="submit">${icon('calendar')}${state.plan?'更新复习草案':'生成复习草案'}</button></form><div id="plan-output" ${state.plan?'class="plan-output" aria-live="polite"':'aria-live="polite"'}>${state.plan?planView(state.plan):''}</div></section><aside><section class="panel"><h3 class="panel-title"><span class="left">${icon('compass')}从官方信息开始</span></h3><div class="official-links">${examLinks.map(l=>`<a class="official-link" href="${l.url}" target="_blank" rel="noopener noreferrer"><div><strong>${l.title}</strong><small>${l.subtitle}</small></div>${icon('external')}</a>`).join('')}</div></section><section class="panel section-divider"><h3 class="panel-title"><span class="left">${icon('book')}公共课与复试怎么准备？</span></h3><ul class="notes-list"><li><div><strong>数学与英语</strong>核对报考要求，完成基础诊断并安排持续练习。</div></li><li><div><strong>思想政治理论</strong>按适用的考试要求组织知识与练习，定期复盘。</div></li><li><div><strong>复试与项目表达</strong>以院校通知为准，准备专业知识、项目讲述与模拟练习。</div></li></ul><a class="text-link" href="#support" style="margin-top:14px">梳理我的帮扶需求 ${icon('arrow')}</a></section></aside></div>`;
}
function supportPage() {
  return `<div class="page-header"><div><div class="eyebrow">SUPPORT ALONG THE WAY</div><h1>遇到卡点，让问题更清楚一点。</h1><p>把当前基础、目标和具体问题整理成一份需求草稿，为之后的导师沟通做好准备。</p></div></div><div class="notice">${icon('info')}<span>帮扶服务为产品流程演示，目前没有接入真实导师、排期或支付。填写的需求只保存在当前浏览器，不会发送给任何人。</span></div><div class="support-grid">${helpServices.map(s=>`<article class="support-card"><span class="tile-icon tone-green">${icon(s.icon)}</span><h3>${s.title}</h3><p>${s.desc}</p><small>${s.output}</small><button class="btn btn-secondary" data-help="${s.id}">整理我的需求 ${icon('arrow')}</button></article>`).join('')}</div><div class="roadmap-intro section-divider"><div class="roadmap-step"><b>01</b><strong>明确问题</strong><p>写出目标、基础和已经尝试过的方法。</p></div><div class="roadmap-step"><b>02</b><strong>保存需求草稿</strong><p>在当前浏览器留存，也可以导出自行备份。</p></div><div class="roadmap-step"><b>03</b><strong>后续接入导师</strong><p>正式服务需配置导师审核、排期和反馈流程。</p></div></div><section class="support-status"><h3>我的帮扶需求草稿</h3>${state.drafts.length?state.drafts.map((d,i)=>`<article class="draft-item"><div><strong>${helpServices.find(s=>s.id===d.service)?.title} · ${e(d.goal || '暂未填写目标')}</strong><p>${e(d.text)}</p></div><div><span class="draft-badge">仅本地草稿</span><button class="icon-button" data-delete-draft="${i}" aria-label="删除第 ${i+1} 份需求草稿">${icon('close')}</button></div></article>`).join(''):`<p class="privacy-line">还没有草稿。选择一个方向，把最想解决的问题写下来。</p>`}${state.drafts.length?`<button class="export-link" data-action="export-drafts">${icon('download')} 导出需求草稿</button>`:''}</section>`;
}
function workspacePage() {
  const joined=state.joined.map(itemById).filter(Boolean);
  const stages=joined.reduce((sum,item)=>sum+progressFor(item,state).count,0);
  const total=joined.reduce((sum,item)=>sum+item.stages.length,0);
  const completed=joined.filter(item=>progressFor(item,state).percent===100).length;
  const next=joined.find(item=>progressFor(item,state).percent<100);
  const nextIndex=next?.stages.findIndex((_,i)=>!(state.done[next.id]||[]).includes(i));
  const saved=state.saved.map(id=>resources.find(r=>r.id===id)).filter(Boolean).reverse();
  const metric=(href,value,label,action='')=>`<a class="workspace-metric" href="#${href}" ${action?`data-action="${action}"`:''}><span class="workspace-metric-label">${label}${icon('arrow')}</span><strong>${value}</strong><small>查看详情</small></a>`;
  return `<div class="workspace-page">
    <header class="workspace-hero">
      <div><div class="eyebrow">MY LEARNING / WORKSPACE</div><h1>我的学习空间</h1><p>接着上一次的进度，把学习路线、知识收藏与备考计划，变成今天可以完成的一步。</p><div class="workspace-status">${icon(storageAvailable?'check':'info')}<span>${storageAvailable?'学习记录已在当前浏览器保存':'浏览器暂时无法保存，记录仅在本次会话中有效'}</span></div></div>
      <div class="workspace-orbit" aria-hidden="true"><span>${icon('terminal')}</span><small>LEARN · BUILD · GROW</small></div>
    </header>
    <div class="workspace-metrics" aria-label="我的学习统计">
      ${metric('learning',joined.length,'已加入路线')}${metric('learning',stages,'已完成阶段')}${metric('saved',saved.length,'已收藏资料','saved')}${metric('learning',completed,'已完成路线')}
    </div>
    <section class="workspace-next panel" aria-labelledby="workspace-next-title">
      <div><div class="eyebrow">YOUR NEXT STEP</div><h2 id="workspace-next-title">${next?'继续未完成的学习':joined.length?'已完成所有已加入路线':'从第一条学习路线开始'}</h2>${next?`<h3>${e(next.title)} <span>第 ${nextIndex+1} / ${next.stages.length} 阶段</span></h3><p>${e(next.stages[nextIndex][0])}：${e(next.stages[nextIndex][1])}</p>`:`<p>${joined.length?'每一次完成都值得肯定。回顾已有成果，或选择一个新方向继续探索。':'选择感兴趣的方向，加入学习并勾选完成的阶段，这里就会显示你的真实进度。'}</p>`}</div>
      ${next?`<button class="btn btn-primary" data-path="${next.id}">继续学习 ${icon('arrow')}</button>`:`<a class="btn btn-primary" href="#tech">探索学习方向 ${icon('arrow')}</a>`}
    </section>
    <div class="workspace-columns">
      <section class="workspace-section panel" aria-labelledby="workspace-routes-title">
        <div class="workspace-section-head"><h2 id="workspace-routes-title">学习中的路线</h2><a href="#learning">查看全部 ${icon('arrow')}</a></div>
        ${joined.length?`<p class="workspace-summary">已完成 ${stages} / ${total} 个阶段，${completed} 条路线已走完。</p><div class="workspace-route-list">${joined.slice(0,4).map(item=>{const progress=progressFor(item,state);return `<button class="workspace-route" data-path="${item.id}"><span class="tile-icon tone-${item.tone}">${icon(item.icon)}</span><span class="workspace-route-body"><strong>${e(item.title)}</strong><span class="progress-label"><span>${progress.count} / ${progress.total} 阶段</span><span>${progress.percent}%</span></span><span class="small-progress"><span style="width:${progress.percent}%"></span></span></span>${icon('chevron')}</button>`;}).join('')}</div>`:`<div class="workspace-empty">${icon('branch')}<h3>还没有加入路线</h3><p>技术方向与考研专题都可以加入学习，进度会同步显示在这里。</p><a class="btn btn-secondary" href="#tech">选择学习路线 ${icon('arrow')}</a></div>`}
      </section>
      <section class="workspace-section panel" aria-labelledby="workspace-plans-title">
        <div class="workspace-section-head"><h2 id="workspace-plans-title">我的备考与帮扶</h2>${icon('cap')}</div>
        <div class="workspace-plan"><span class="subtle-badge">${state.plan?'已生成草案':'待制定'}</span><h3>考研复习计划</h3><p>${state.plan?`${state.plan.weeks} 周 · 每天 ${state.plan.hours} 小时 · ${state.plan.subject==='408'?'408 专业课':'院校自命题专业课'}`:'按备考周数和每天可用时间，生成适合自己的复习草案。'}</p><div class="workspace-actions"><a class="btn btn-secondary" href="#exam">${state.plan?'查看 / 调整计划':'制定复习计划'} ${icon('arrow')}</a>${state.plan?`<button class="export-link" data-action="export-plan">${icon('download')}导出计划</button>`:''}</div></div>
        <div class="workspace-drafts"><h3>帮扶需求草稿 <span>${state.drafts.length} 份</span></h3><p>${state.drafts.length?'已保存需求草稿，可继续查看、整理或导出。草稿尚未发送给导师。':'整理择校、复习或答疑问题，为后续沟通做准备。'}</p><a href="#support" class="workspace-text-link">${state.drafts.length?'查看我的草稿':'整理帮扶需求'} ${icon('arrow')}</a></div>
      </section>
    </div>
    <section class="workspace-section panel workspace-saved" aria-labelledby="workspace-saved-title">
      <div class="workspace-section-head"><h2 id="workspace-saved-title">我的知识收藏</h2><a href="#saved" data-action="saved">查看全部 ${saved.length} 份 ${icon('arrow')}</a></div>
      ${saved.length?`<p class="workspace-summary">最近加入收藏的资料，点击即可在新标签页继续阅读。</p><div class="resource-list">${saved.slice(0,3).map(r=>resourceRow(r,true)).join('')}</div>`:`<div class="workspace-empty">${icon('bookmark')}<h3>把好资料留在手边</h3><p>在资料库点击收藏按钮，就能在这里快速找到。</p><a class="btn btn-secondary" href="#resources">浏览学习资料 ${icon('arrow')}</a></div>`}
    </section>
    <section class="workspace-section" aria-labelledby="workspace-tools-title"><div class="workspace-section-head"><h2 id="workspace-tools-title">实践与求职</h2><span class="workspace-summary">让输入变成输出</span></div><div class="workspace-tools"><a class="panel workspace-tool" href="#projects"><span class="tile-icon tone-green">${icon('code')}</span><div><h3>项目实践</h3><p>按岗位和地区寻找开源项目，开始动手实践。</p></div>${icon('arrow')}</a><a class="panel workspace-tool" href="#interviews"><span class="tile-icon tone-purple">${icon('users')}</span><div><h3>笔试与面试</h3><p>进入岗位题库、公司专题与面试复盘。</p></div>${icon('arrow')}</a></div></section>
    <div class="workspace-backup notice">${icon('info')}<p>学习进度、收藏、复习计划与帮扶草稿${storageAvailable?'保存在当前浏览器':'当前仅保留在本次会话'}，暂不支持跨设备同步。可以导出一份学习记录留作备份。</p><button class="btn btn-secondary" data-action="export-learning">${icon('download')}导出学习记录</button></div>
  </div>`;
}
function learningPage() {
  const joined=state.joined.map(itemById).filter(Boolean), completed=joined.filter(p=>progressFor(p,state).percent===100).length, stages=joined.reduce((n,p)=>n+progressFor(p,state).count,0);
  return `<div class="page-header"><div><div class="eyebrow">SMALL STEPS, REAL PROGRESS</div><h1>每一个完成，都留下痕迹。</h1><p>不必着急走得很快，持续完成阶段任务，让知识真正成为自己的能力。</p></div></div><div class="dashboard-grid"><div class="dashboard-stat"><b>${joined.length}</b><span>已加入学习的路线</span></div><div class="dashboard-stat"><b>${stages}</b><span>已完成的学习阶段</span></div><div class="dashboard-stat"><b>${completed}</b><span>已走完的完整路线</span></div></div>${joined.length?`<div class="path-grid">${joined.map(p=>card(p,true)).join('')}</div>`:empty('你的第一条路线，正等着开始','打开一条感兴趣的路线，点击「加入我的学习」，就可以记录阶段进度。')}<div class="notice">${icon('info')}<span>学习进度与收藏${storageAvailable?'保存在当前浏览器':'暂时只能保留在本次页面会话'}，暂不支持跨设备同步。暂停路线会保留阶段进度，下次加入时可以继续。</span></div>`;
}
function searchPage() {
  const q=query().trim();if(!q) return empty('输入你想学习的内容','可以搜索「Agent」「机器学习」「前端」或资料名称。');
  const foundCareer=career.search(q), foundProjects=projectLab.search(q);
  const foundPaths=paths.filter(p=>matchesQuery(p,q)), foundResources=resources.filter(r=>matchesQuery({...r,tags:r.paths.map(id=>itemById(id)?.title||'')},q)), foundExam=examTopics.filter(p=>matchesQuery(p,q));
  return `<div class="page-header"><div><h1>搜索 <span class="query-label">“${e(q)}”</span></h1><p>找到 ${foundPaths.length} 条技术路线、${foundResources.length} 份资料、${foundExam.length} 个考研专题、${foundProjects.count} 个实践项目与 ${foundCareer.count} 项求职内容。</p></div><button class="btn btn-secondary" data-action="clear-search">清除搜索 ${icon('close')}</button></div>${foundPaths.length?`<h2 class="search-heading">技术学习路线</h2><div class="path-grid">${foundPaths.map(p=>card(p)).join('')}</div>`:''}${foundResources.length?`<h2 class="search-heading">学习资料</h2><div class="resource-list">${foundResources.map(r=>resourceRow(r,true)).join('')}</div>`:''}${foundExam.length?`<h2 class="search-heading">考研知识梳理</h2><div class="path-grid">${foundExam.map(p=>card(p)).join('')}</div>`:''}${foundProjects.markup}${foundCareer.markup}${!foundPaths.length&&!foundResources.length&&!foundExam.length&&!foundCareer.count&&!foundProjects.count?empty('还没有找到相关内容','试试更简短的关键词，或浏览所有学习方向。'):''}`;
}
function render() {
  const views={workspace:workspacePage,projects:projectLab.page,interviews:career.page,home,tech:()=>technology(),roadmaps:()=>technology(true),resources:()=>resourcePage(),saved:()=>resourcePage(true),exam:examPage,support:supportPage,learning:learningPage,search:searchPage};
  disposeHomeMotion();
  disposeFluidMotion();
  nav();document.body.dataset.page=route();content.innerHTML=(views[route()] || home)();document.title=`${titles[route()] || titles.home} · 知序`;
  disposeHomeMotion = mountHomeMotion();
  disposeFluidMotion = mountFluidMotion();
}
function dialogHeader(eyebrow,title,desc='') { return `<div class="dialog-header"><div><div class="eyebrow">${eyebrow}</div><h2 id="dialog-title">${title}</h2>${desc?`<p>${desc}</p>`:''}</div><button class="icon-button" data-action="close-dialog" aria-label="关闭弹窗">${icon('close')}</button></div>`; }
function showDialog(markup) { lastFocus=document.activeElement;document.getElementById('dialog-content').innerHTML=markup;if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden';dialog.scrollTop=0; }
function closeDialog() {dialog.close();}
function curriculumMarkup(p) {
  const c=p.curriculum; if(!c) return '';
  const theory=c.theory.map(item=>'<article class="theory-card fluid-module"><span class="curriculum-index">'+String(c.theory.indexOf(item)+1).padStart(2,'0')+'</span><h4>'+e(item.title)+'</h4><p>'+e(item.text)+'</p></article>').join('');
  const practice=c.practice.map(item=>'<article class="practice-card fluid-module"><h4>'+e(item.title)+'</h4><ol>'+item.steps.map(step=>'<li>'+e(step)+'</li>').join('')+'</ol><p class="practice-output"><strong>练习产出：</strong>'+e(item.output)+'</p></article>').join('');
  return '<section class="curriculum-block"><div class="curriculum-heading"><div class="eyebrow">DEEP PRACTICE MAP</div><h3>理论体系与实操路径</h3><p>'+e(c.focus)+'</p></div><div class="theory-grid">'+theory+'</div><h3 class="dialog-subtitle">分阶段实验与练习产出</h3><div class="practice-grid">'+practice+'</div><div class="project-brief"><strong>综合项目：</strong>'+e(c.project)+'</div><div class="pitfall-note"><strong>常见误区：</strong>'+e(c.pitfalls)+'</div></section>';
}
function showPath(id,keepFocus=false) {
  const p=itemById(id);if(!p)return;
  const progress=progressFor(p,state), joined=state.joined.includes(id), related=resources.filter(r=>r.paths.includes(id));
  const markup=dialogHeader(p.en || 'POSTGRADUATE STUDY',p.title,p.desc)+`<div class="dialog-body"><div class="dialog-lead"><span id="dialog-progress">${progress.count}/${progress.total} 个阶段已完成 · ${progress.percent}%</span><button class="btn ${joined?'btn-secondary':'btn-primary'}" data-join="${id}">${icon(joined?'check':'calendar')}${joined?'已加入我的学习':'加入我的学习'}</button></div><ol class="stage-list">${p.stages.map(([title,desc],i)=>`<li class="stage-item ${(state.done[id]||[]).includes(i)?'completed':''}"><input class="stage-check" type="checkbox" id="stage-${i}" data-stage="${i}" data-item="${id}" ${(state.done[id]||[]).includes(i)?'checked':''}><label for="stage-${i}">${title}</label><p>${desc}</p></li>`).join('')}</ol>${curriculumMarkup(p)}${related.length?`<h3 class="dialog-subtitle">搭配这些资料开始学习</h3><div class="resource-list dialog-resources">${related.map(r=>resourceRow(r,true)).join('')}</div>`:''}${!p.id.startsWith('exam-')?projectLab.preview(p.id)+career.preview(p.id):''}<div class="notice">${icon('info')}<span>${p.id.startsWith('exam-')?'提纲用于组织复习，实际范围请核对目标专业当年考试要求。':'阶段顺序是一份起点，可以根据已有基础调整学习节奏。'} 勾选阶段会自动加入学习，记录保存在当前浏览器。</span></div></div>`;
  if(keepFocus){document.getElementById('dialog-content').innerHTML=markup;dialog.querySelector('[data-join]')?.focus({preventScroll:true});return;}showDialog(markup);
}
function showGuide() {
  showDialog(dialogHeader('FIND YOUR STARTING POINT','从现在的你，找到下一步。','选择最接近你当前目标的一项。')+`<div class="dialog-body"><div class="guide-options"><button class="guide-option" data-guide="foundation">${icon('book')}<strong>我刚开始学习计算机</strong><p>先补齐程序、系统与算法基础，再选择具体方向。</p></button><button class="guide-option" data-guide="ai">${icon('bot')}<strong>我想进入 AI 与大模型</strong><p>按已有基础，从机器学习、深度学习走向模型与应用。</p></button><button class="guide-option" data-guide="engineering">${icon('code')}<strong>我想做出完整的产品</strong><p>从前后端到测试与交付，选择一条工程实践路线。</p></button><button class="guide-option" data-guide="exam">${icon('cap')}<strong>我正在准备计算机考研</strong><p>先核对目标考试科目，再安排专业课梳理与复习计划。</p></button></div><p class="onboarding-tip">暂时不确定也没关系。先打开一条路线，看看第一个任务是否适合现在的自己。</p></div>`);
}
function showHelp(id) {
  const service=helpServices.find(s=>s.id===id);if(!service)return;
  showDialog(dialogHeader('SUPPORT REQUEST DRAFT',service.title,'把需求写清楚，后续沟通会更有方向。')+`<div class="dialog-body"><form id="help-form" data-service="${id}"><label class="form-field">目标院校 / 专业 / 备考目标（可选）<input name="goal" placeholder="例如：希望确定适合自己基础的目标院校" maxlength="100"></label><label class="form-field" style="margin-top:17px">当前基础与想解决的问题<textarea name="text" placeholder="写下当前复习进度、具体困难，以及已经尝试过的方法…" required minlength="10" maxlength="1500"></textarea></label><div class="notice">${icon('info')}<span>这是本地需求草稿，不会提交给导师。请勿填写身份证号、账号密码等敏感信息。</span></div><div class="form-actions"><button class="btn btn-primary" type="submit">保存需求草稿 ${icon('check')}</button><button class="btn btn-secondary" type="button" data-action="close-dialog">稍后再写</button></div></form></div>`);
}
function exportFile(name,text,type='text/plain;charset=utf-8') {
  const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function setSidebar(open) {document.getElementById('sidebar').classList.toggle('open',open);document.getElementById('sidebar-overlay').hidden=!open;document.getElementById('mobile-menu').setAttribute('aria-expanded',String(open));}
document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(target.closest('.sidebar') && target.getAttribute('href')?.startsWith('#'))setSidebar(false);
  if(target.dataset.resourceLanguage){resourceLanguage=target.dataset.resourceLanguage;render();document.querySelector('[data-resource-language]')?.focus();return;}
  if(target.dataset.resources){resourcePath=target.dataset.resources;resourceLanguage='all';resourceLevel='all';if(dialog.open)closeDialog();go('resources');return;}
  if(target.dataset.path){showPath(target.dataset.path);return;}
  if(target.dataset.category){activeCategory=target.dataset.category;render();return;}
  if(target.dataset.save){
    const id=target.dataset.save,saved=state.saved.includes(id);state.saved=saved?state.saved.filter(x=>x!==id):[...state.saved,id];const stored=persist();render();
    document.querySelectorAll(`[data-save="${id}"]`).forEach(button=>{button.classList.toggle('is-saved',!saved);button.setAttribute('aria-pressed',String(!saved));button.setAttribute('aria-label',`${saved?'收藏':'取消收藏'} ${resources.find(r=>r.id===id).title}`);});
    if(stored)toast(saved?'已取消收藏':'已收藏，可在「我的收藏」中查看');return;
  }
  if(target.dataset.join){const id=target.dataset.join;if(!state.joined.includes(id)){state.joined.push(id);const stored=persist();render();showPath(id,true);if(stored)toast('已加入我的学习，完成后可以勾选阶段');}else toast('路线已在「我的学习」中');return;}
  if(target.dataset.pause){state.joined=state.joined.filter(id=>id!==target.dataset.pause);const stored=persist();render();if(stored)toast('已暂停路线，阶段进度已保留');return;}
  if(target.dataset.help){showHelp(target.dataset.help);return;}
  if(target.dataset.guide){const next=target.dataset.guide;closeDialog();if(next==='exam'){go('exam');}else{activeCategory=next;go('tech');}return;}
  if(target.hasAttribute('data-delete-draft')){state.drafts.splice(Number(target.dataset.deleteDraft),1);const stored=persist();render();if(stored)toast('已删除需求草稿');return;}
  switch(target.dataset.action){
    case 'guide':showGuide();break;
    case 'saved':resourcePath='all';resourceLanguage='all';resourceLevel='all';go('saved');break;
    case 'close-dialog':closeDialog();break;
    case 'clear-search':document.getElementById('search-input').value='';go('resources');break;
    case 'export-learning':exportFile('知序-学习记录.json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),learning:state},null,2),'application/json');toast('学习记录已导出');break;
    case 'export-drafts':exportFile('知序-帮扶需求草稿.json',JSON.stringify(state.drafts,null,2),'application/json');toast('需求草稿已导出');break;
    case 'export-plan':if(state.plan){const p=buildExamPlan(state.plan);exportFile('知序-复习计划.txt',`知序 · ${p.weeks} 周复习草案\n每天可用时间：${p.hours} 小时\n专业课：${p.subject==='408'?'408':'自命题'}\n\n${p.phases.map(x=>`${x.name}：${x.weeks} 周\n${x.focus}`).join('\n\n')}\n\n每日参考分配\n${p.daily.map(x=>`${x.name}：${x.hours} 小时`).join('\n')}\n\n这是按固定比例生成的初始草案，请根据实际考试科目和个人基础调整；不考数学时请重新分配时间。\n考试要求以当年院校官方信息为准。`);toast('复习草案已导出');}break;
  }
});
document.addEventListener('change',event=>{
  const target=event.target;
  if(target.id==='resource-path'){resourcePath=target.value;render();}
  if(target.id==='resource-level'){resourceLevel=target.value;render();}
  if(target.id==='resource-language'){resourceLanguage=target.value;render();}
  if(target.matches('[data-stage]')){
    const id=target.dataset.item,index=Number(target.dataset.stage),done=new Set(state.done[id]||[]);if(target.checked)done.add(index);else done.delete(index);state.done[id]=[...done];
    if(!state.joined.includes(id))state.joined.push(id);persist();target.closest('.stage-item').classList.toggle('completed',target.checked);
    const p=progressFor(itemById(id),state);document.getElementById('dialog-progress').textContent=`${p.count}/${p.total} 个阶段已完成 · ${p.percent}%`;
    const joinButton=dialog.querySelector('[data-join]');joinButton.innerHTML=icon('check')+'已加入我的学习';joinButton.className='btn btn-secondary';render();
  }
});
document.addEventListener('submit',event=>{
  if(event.target.id==='global-search'){event.preventDefault();const q=document.getElementById('search-input').value.trim();if(q)go(`search?q=${encodeURIComponent(q)}`);else toast('先输入一个想学习的关键词');}
  if(event.target.id==='plan-form'){event.preventDefault();const form=new FormData(event.target),plan={weeks:Number(form.get('weeks')),hours:Number(form.get('hours')),subject:form.get('subject')};try{buildExamPlan(plan);state.plan=plan;const stored=persist();render();if(stored)toast('复习草案已生成，可以继续调整或导出');}catch(err){toast(err.message);}}
  if(event.target.id==='help-form'){
    event.preventDefault();const form=new FormData(event.target),text=String(form.get('text')).trim();if(text.length<10){toast('请至少填写 10 个字，描述具体问题');return;}
    if(state.drafts.length>=20){toast('最多保存 20 份草稿，请先导出或删除已有草稿');return;}
    state.drafts.unshift({service:event.target.dataset.service,goal:String(form.get('goal')).trim(),text});const stored=persist();closeDialog();render();if(stored)toast('草稿已保存在本地，尚未发送给导师');
  }
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(lastFocus?.isConnected)lastFocus.focus();else content.focus({preventScroll:true});});
document.getElementById('mobile-menu').addEventListener('click',()=>setSidebar(!document.getElementById('sidebar').classList.contains('open')));
document.getElementById('sidebar-overlay').addEventListener('click',()=>setSidebar(false));
window.addEventListener('hashchange',()=>{setSidebar(false);render();window.scrollTo(0,0);if(route()==='search')document.getElementById('search-input').value=query();content.focus({preventScroll:true});});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!dialog.open){event.preventDefault();document.getElementById('search-input').focus();}if(event.key==='Escape')setSidebar(false);});
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
render();if(route()==='search')document.getElementById('search-input').value=query();if(!storageAvailable)toast('无法读取本地记录，当前先以空白学习空间打开。');

// Theme preference is independent of learning progress; changing it never re-renders a form.
const themeStorageKey = 'zhixu-theme-v1';
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
let explicitTheme = null;
try { const saved = localStorage.getItem(themeStorageKey); if (['dark','light'].includes(saved)) explicitTheme = saved; } catch {}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f2f4fc' : '#090b15';
  const button = document.getElementById('theme-toggle');
  const target = theme === 'dark' ? '浅色' : '深色';
  button.setAttribute('aria-label', '切换到' + target + '模式');
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.title = '切换到' + target + '模式';
  button.querySelector('.theme-label').textContent = theme === 'dark' ? '深色' : '浅色';
}
applyTheme(explicitTheme || (themeMedia.matches ? 'light' : 'dark'));
document.getElementById('theme-toggle').addEventListener('click', () => {
  explicitTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(explicitTheme);
  try { localStorage.setItem(themeStorageKey, explicitTheme); } catch { toast('已切换外观；浏览器限制存储，刷新后可能恢复系统主题。'); }
});
themeMedia.addEventListener('change', event => { if (!explicitTheme) applyTheme(event.matches ? 'light' : 'dark'); });
window.addEventListener('storage', event => {
  if (event.key !== themeStorageKey && event.key !== null) return;
  explicitTheme = ['dark','light'].includes(event.newValue) ? event.newValue : null;
  applyTheme(explicitTheme || (themeMedia.matches ? 'light' : 'dark'));
});

// Global fluid visual system: every route and module shares the same motion language.
function mountFluidMotion() {
  if (!fluidSystem) fluidSystem = createFluidSystem();
  return fluidSystem.mount();
}

function createFluidSystem() {
  const root = document.documentElement;
  const shell = document.querySelector('.shell');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  try { paused = localStorage.getItem('zhixu-home-motion-v1') === 'paused'; } catch {}
  const button = document.createElement('button');
  button.type = 'button';button.id = 'fluid-motion-toggle';button.className = 'fluid-motion-toggle';
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 8c3-7 5 7 9 0s6 7 9 0M3 16c3-7 5 7 9 0s6 7 9 0"/></svg><span class="fluid-control-dot" aria-hidden="true"></span>';
  document.getElementById('theme-toggle').after(button);
  const canvas = document.createElement('canvas');
  canvas.id = 'fluid-atmosphere';canvas.setAttribute('aria-hidden','true');shell.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let width = 1, height = 1, frame = 0, last = 0, elapsed = 0;
  let palette = {}, glowMaps = [], running = false, active = null, pointer = null;
  let cursor = {x:.7,y:.35}, targetCursor = {...cursor};
  let revealObserver, modalObserver, surfaceSet = new Set();
  const animations = new Set(), droplets = new Set();
  const surfaceSelector = '.workspace-hero,.workspace-metric,.project-card,.path-card,.resource-row,.support-card,.subject-card,.panel,.planner,.exam-banner,.notice,.draft-item,.roadmap-step,.company-card,.question-card,.strategy-card,.curated-experience,.experience-empty,.review-notebook,.role-overview,.company-focus,.prep-flow,.career-bridge,.overview-stats,.empty-state,.support-status,.search-question,.dashboard-stat,.stat-item,.study-item,.guide-option,.stage-item,.plan-phase,.theory-card,.practice-card,.project-brief,.pitfall-note';
  let routeKey = '', activeSurfaceRect;
  function colors() {
    const style = getComputedStyle(root);
    const rgba = (variable,alpha) => {
      const hex = style.getPropertyValue(variable).trim().replace('#','');
      const full = hex.length === 3 ? [...hex].map(c=>c+c).join('') : hex;
      const n = parseInt(full,16);
      return 'rgba('+[(n>>16)&255,(n>>8)&255,n&255,alpha].join(',')+')';
    };
    palette = {
      cyan:rgba('--ui-cyan',1), violet:rgba('--ui-magenta',1),
      glow:rgba('--ui-cyan',root.dataset.theme==='light'?.08:.10),
      haze:rgba('--ui-magenta',root.dataset.theme==='light'?.065:.085),
      clear:rgba('--ui-cyan',0)
    };
    // Rasterize soft gradients once per palette rather than rebuilding them each frame.
    glowMaps = [palette.glow,palette.haze].map(color=>{
      const texture=document.createElement('canvas');texture.width=texture.height=192;
      const paint=texture.getContext('2d');
      if(paint){
        const gradient=paint.createRadialGradient(96,96,0,96,96,96);
        gradient.addColorStop(0,color);gradient.addColorStop(1,palette.clear);
        paint.fillStyle=gradient;paint.fillRect(0,0,192,192);
      }
      return texture;
    });
    draw();
  }
  function resize() {
    width = innerWidth;height = innerHeight;
    // The decorative field is deliberately rendered below device resolution.
    const ratio = Math.min(devicePixelRatio || 1, width < 760 ? .65 : 1);
    canvas.width = Math.round(width*ratio);canvas.height = Math.round(height*ratio);
    if (ctx) ctx.setTransform(ratio,0,0,ratio,0,0);
    activeSurfaceRect = null;draw();
  }
  function draw() {
    if (!ctx || !palette.cyan) return;
    ctx.clearRect(0,0,width,height);
    const t = elapsed*.00017;
    for (let i=0;i<3;i++) {
      const x=width*(.35+.4*Math.sin(t+i*2.3))+(cursor.x-.5)*40;
      const y=height*(.4+.38*Math.cos(t*.8+i*1.9));
      const r=Math.max(width,height)*(.38+i*.05);
      ctx.drawImage(glowMaps[i===1?1:0],x-r,y-r,r*2,r*2);
    }
    // Continuous, broad ribbons move in phase; thin caustic lines trace their edges.
    for (let i=0;i<3;i++) {
      const y=height*(.24+i*.28), sway=Math.sin(t*2+i)*height*.12;
      const gradient=ctx.createLinearGradient(0,y,width,y+sway);
      gradient.addColorStop(0,palette.clear);gradient.addColorStop(.45,i%2?palette.violet:palette.cyan);gradient.addColorStop(1,palette.clear);
      ctx.strokeStyle=gradient;
      for (let layer=0;layer<2;layer++) {
        ctx.globalAlpha=layer===0?.035:.16;ctx.lineWidth=layer===0?(width<760?26:50):.8;
        ctx.beginPath();ctx.moveTo(-40,y+sway);
        ctx.bezierCurveTo(width*.25,y-height*.2+sway,width*.65,y+height*.23-sway,width+40,y-sway);
        ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
  }
  function track(animation) {
    animations.add(animation);
    animation.onfinish = animation.oncancel = () => animations.delete(animation);
    return animation;
  }
  function settle() {
    for (const animation of [...animations]) {try {animation.finish();} catch {animation.cancel();}}
    droplets.forEach(el=>el.remove());droplets.clear();
  }
  function resetActive() {
    active?.classList.remove('fluid-active');active=null;activeSurfaceRect=null;
  }
  function tick(now) {
    frame=0;if(!running)return;
    const interval=width<760?1000/18:1000/24;
    if(now-last>=interval) {
      elapsed+=last?Math.min(now-last,90):0;last=now;
      cursor.x+=(targetCursor.x-cursor.x)*.12;cursor.y+=(targetCursor.y-cursor.y)*.12;
      if(pointer && active?.isConnected) {
        activeSurfaceRect ||= active.getBoundingClientRect();
        const x=(pointer.x-activeSurfaceRect.left)/activeSurfaceRect.width;
        const y=(pointer.y-activeSurfaceRect.top)/activeSurfaceRect.height;
        active.style.setProperty('--surface-x',(Math.max(0,Math.min(1,x))*100)+'%');
        active.style.setProperty('--surface-y',(Math.max(0,Math.min(1,y))*100)+'%');
      }
      draw();
    }
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;last=0;
    running=!paused&&!reduced.matches&&!document.hidden;
    root.dataset.fluidState=reduced.matches?'reduced':paused?'paused':document.hidden?'idle':'running';
    button.disabled=reduced.matches;button.setAttribute('aria-pressed',String(paused));
    const label=reduced.matches?'系统已减少动态效果':paused?'开启全站动效':'暂停全站动效';
    button.title=label;button.setAttribute('aria-label',label);
    if(!running){settle();resetActive();}draw();
    if(running)frame=requestAnimationFrame(tick);
  }
  function ripple(event) {
    if(!running || event.button>0)return;
    const host=event.target.closest('button,a,summary');
    if(!host || host.disabled || host.closest('#fluid-motion-toggle,#motion-toggle'))return;
    if(!content.contains(host)&&!dialog.contains(host)&&!host.closest('.sidebar,.topbar'))return;
    const rect=host.getBoundingClientRect(),el=document.createElement('span'),clip=document.createElement('span');
    clip.className='fluid-droplet-clip';clip.setAttribute('aria-hidden','true');
    el.className='fluid-droplet';el.setAttribute('aria-hidden','true');
    const size=Math.min(650,Math.max(rect.width,rect.height)*1.6);
    el.style.width=el.style.height=size+'px';
    el.style.left=(event.clientX-rect.left-size/2)+'px';el.style.top=(event.clientY-rect.top-size/2)+'px';
    host.classList.add('fluid-interactive');clip.append(el);host.append(clip);droplets.add(clip);
    if(droplets.size>8){const first=droplets.values().next().value;first.remove();droplets.delete(first);}
    const a=track(el.animate([{opacity:.65,transform:'scale(.08)'},{opacity:0,transform:'scale(1)'}],{duration:850,easing:'cubic-bezier(.16,.7,.3,1)'}));
    const remove=()=>{animations.delete(a);droplets.delete(clip);clip.remove();};a.onfinish=a.oncancel=remove;
  }
  function decorate(scope) {
    for (const el of surfaceSet) {
      if (!el.isConnected) { revealObserver?.unobserve(el);surfaceSet.delete(el); }
    }
    const surfaces=[...scope.querySelectorAll(surfaceSelector)];
    for(const el of surfaces) {
      if(surfaceSet.has(el))continue;
      surfaceSet.add(el);el.classList.add('fluid-surface','fluid-module');
      const sheen=document.createElement('span');sheen.className='fluid-surface-light';sheen.setAttribute('aria-hidden','true');el.append(sheen);
      revealObserver?.observe(el);
    }
    scope.querySelectorAll('.page-header,.welcome-row,.category-tabs,.career-selector,.career-section-tabs,.resource-filters,.section-heading').forEach(el=>{
      if(el.classList.contains('fluid-module'))return;el.classList.add('fluid-module');revealObserver?.observe(el);
    });
  }
  function mount() {
    surfaceSet=new Set();
    const ownedAnimations = new Set();
    const previous=routeKey;routeKey=route();
    content.dataset.fluidRoute=location.hash || '#home';
    // Only visible components animate. Their text always exists and remains accessible.
    revealObserver=new IntersectionObserver(entries=>{
      let order=0;
      for(const entry of entries) {
        entry.target.classList.toggle('fluid-in-view',entry.isIntersecting);
        if(!entry.isIntersecting||entry.target.dataset.fluidRevealed)continue;
        entry.target.dataset.fluidRevealed='true';
        if(!running)continue;
        const a=track(entry.target.animate([
          {opacity:.65,translate:'0 16px',scale:'.988'},
          {opacity:1,translate:'0 0',scale:'1'}
        ],{duration:650,delay:Math.min(order++*35,210),easing:'cubic-bezier(.16,.82,.24,1)',fill:'backwards'}));
        ownedAnimations.add(a);
      }
    },{threshold:.025,rootMargin:'0px 0px -12px 0px'});
    decorate(content);
    if(dialog.open)decorate(document.getElementById('dialog-content')); 
    // Dialog content can be replaced while it stays open (e.g. learning stages).
    modalObserver=new MutationObserver(records=>{
      if(records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1&&!node.matches('.fluid-surface-light,.fluid-droplet,.fluid-droplet-clip')))){
        decorate(document.getElementById('dialog-content'));
      }
    });
    modalObserver.observe(document.getElementById('dialog-content'),{childList:true,subtree:true});
    if(running&&previous!==routeKey) {
      content.classList.remove('fluid-enter');void content.offsetWidth;content.classList.add('fluid-enter');
    }
    return ()=>{
      revealObserver.disconnect();modalObserver.disconnect();
      ownedAnimations.forEach(a=>a.cancel());settle();resetActive();
      content.classList.remove('fluid-enter');
    };
  }
  button.addEventListener('click',()=>{
    paused=!paused;
    try{localStorage.setItem('zhixu-home-motion-v1',paused?'paused':'running');}catch{}
    window.dispatchEvent(new CustomEvent('zhixu-motion-change',{detail:{paused}}));
  });
  window.addEventListener('zhixu-motion-change',event=>{paused=event.detail.paused;sync();});
  window.addEventListener('storage',event=>{
    if(event.key==='zhixu-home-motion-v1'||event.key===null){paused=event.key===null?false:event.newValue==='paused';window.dispatchEvent(new CustomEvent('zhixu-motion-change',{detail:{paused}}));}
  });
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('scroll',()=>{activeSurfaceRect=null;},{passive:true});
  document.addEventListener('pointerdown',ripple,{passive:true,capture:true});
  document.addEventListener('pointermove',event=>{
    if(!running||!fine.matches)return;
    pointer={x:event.clientX,y:event.clientY};targetCursor={x:event.clientX/width,y:event.clientY/height};
    const next=event.target.closest('.fluid-surface');
    if(next!==active){resetActive();active=next;active?.classList.add('fluid-active');}
  },{passive:true});
  document.addEventListener('pointerleave',resetActive);
  const themeObserver=new MutationObserver(colors);themeObserver.observe(root,{attributes:true,attributeFilter:['data-theme']});
  resize();colors();sync();
  return {mount};
}

// Own all observers/listeners/frames per render; leaving home releases them immediately.
function mountHomeMotion() {
  const hero = document.querySelector('.hero');
  if (!hero) return () => {};
  const canvas = hero.querySelector('.hero-network');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return () => {};
  const controls = hero.querySelector('#motion-toggle');
  const terminal = hero.querySelector('.terminal-line');
  const originalTerminal = terminal.innerHTML;
  const signal = new AbortController();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  try { paused = localStorage.getItem('zhixu-home-motion-v1') === 'paused'; } catch {}
  let width = 1, height = 1, frame = 0, last = 0, elapsed = 0, inView = true, disposed = false;
  let pointer = { x: .68, y: .45, active: false }, cyan, violet, theme, previousText = '';
  let origin = {x: 1, y: 1}, sceneWidth = 1, sceneHeight = 1;
  const trails = [], pulses = [];
  const scene = hero.querySelector('.compute-scene');
  const sphere = count => Array.from({length: count}, (_, i) => {
    const y = 1 - 2 * (i + .5) / count;
    const radius = Math.sqrt(1 - y * y), angle = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });
  const nodes = sphere(64), mobileNodes = sphere(36);
  const commands = ['start learning --path your-future', 'explore agent --build ideas', 'practice algorithms --think deeper', 'connect knowledge --create next'];
  function colors() {
    const style = getComputedStyle(hero);
    cyan = style.getPropertyValue('--ui-cyan').trim();
    violet = style.getPropertyValue('--ui-magenta').trim();
    theme = document.documentElement.dataset.theme;
  }
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const bounds = hero.getBoundingClientRect(), sceneBounds = scene.getBoundingClientRect();
    origin = {x: sceneBounds.left - bounds.left + sceneBounds.width / 2, y: sceneBounds.top - bounds.top + sceneBounds.height / 2};
    sceneWidth = sceneBounds.width;sceneHeight = sceneBounds.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const mobile = width < 620, cx = origin.x, cy = origin.y;
    const radius = Math.min(sceneWidth * .54, sceneHeight * .94, mobile ? 185 : 260);
    const a = elapsed * .00022;
    // A perspective floor and outward light trails give the core a sense of depth.
    ctx.save();ctx.beginPath();
    ctx.rect(mobile ? 0 : width * .5, mobile ? cy - radius * 1.15 : 0, mobile ? width : width * .5, height);ctx.clip();
    const floor = cy + radius * .44, bottom = height + 80;
    ctx.strokeStyle = cyan;ctx.lineWidth = .7;ctx.globalAlpha = theme === 'light' ? .13 : .2;
    for (let i = -7; i <= 7; i++) {
      ctx.beginPath();ctx.moveTo(cx + i * 12, floor);ctx.lineTo(cx + i * radius * .43, bottom);ctx.stroke();
    }
    for (let i = 0; i < 10; i++) {
      const depth = ((i / 10 + elapsed * .000065) % 1) ** 2;
      const y = floor + depth * (bottom - floor), half = 60 + depth * radius * 3;
      ctx.globalAlpha = depth * (theme === 'light' ? .18 : .3);
      ctx.beginPath();ctx.moveTo(cx - half,y);ctx.lineTo(cx + half,y);ctx.stroke();
    }
    for (let i = 0; i < (mobile ? 14 : 30); i++) {
      const angle = i * 2.39996, travel = (elapsed * .00016 + i * .61803) % 1;
      const distance = radius * (.27 + travel * 1.18), length = 5 + travel * 24;
      const x = cx + Math.cos(angle) * distance, y = cy + Math.sin(angle) * distance * .77;
      ctx.strokeStyle = i % 4 === 0 ? violet : cyan;ctx.lineWidth = i % 5 === 0 ? 1.7 : .8;
      ctx.globalAlpha = Math.sin(travel * Math.PI) * (theme === 'light' ? .42 : .65);
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x - Math.cos(angle) * length,y - Math.sin(angle) * length * .77);ctx.stroke();
    }
    // Expanding waves are continuous and low contrast, without full-screen flashes.
    for(let i = 0; i < 3; i++) {
      const phase = (elapsed * .00018 + i / 3) % 1;
      ctx.globalAlpha = (1 - phase) * (theme === 'light' ? .2 : .32);
      ctx.strokeStyle = i % 2 ? violet : cyan;ctx.lineWidth = 1;
      ctx.beginPath();ctx.ellipse(cx,cy,radius * (.3 + phase * .9),radius * (.14 + phase * .36),-.3,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();
    const projected = (mobile ? mobileNodes : nodes).map(n => {
      const x = n.x * Math.cos(a) - n.z * Math.sin(a), z = n.x * Math.sin(a) + n.z * Math.cos(a);
      const perspective = 1 + z * .14;
      return {x: cx + x * radius * perspective, y: cy + n.y * radius * .83 * perspective, z};
    });
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      for (let j = i + 1; j < projected.length; j++) {
        const q = projected[j], distance = Math.hypot(p.x - q.x, p.y - q.y);
        if (distance > radius * .52 || Math.abs(p.z - q.z) > .9) continue;
        ctx.globalAlpha = (1 - distance / (radius * .52)) * (theme === 'light' ? .28 : .4);
        ctx.strokeStyle = (i + j) % 7 === 0 ? violet : cyan;
        ctx.lineWidth = .65; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        const travel = (elapsed * .00042 + i * .17 + j * .09) % 1;
        if ((i + j) % 4 === 0) {
          ctx.globalAlpha *= 2.5; ctx.fillStyle = ctx.strokeStyle; ctx.beginPath();
          ctx.arc(p.x + (q.x - p.x) * travel, p.y + (q.y - p.y) * travel, 1.8, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = .25 + (p.z + 1) * .2; ctx.fillStyle = i % 5 === 0 ? violet : cyan;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.z > .3 ? 2 : 1.1, 0, Math.PI * 2); ctx.fill();
      if (pointer.active && Math.hypot(p.x - pointer.x * width, p.y - pointer.y * height) < 115) {
        ctx.globalAlpha = .3;ctx.strokeStyle = cyan;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x * width,pointer.y * height);ctx.stroke();
      }
    }
    // Pointer trails and local ripples share the existing bounded canvas loop.
    for(let i = trails.length - 1; i >= 0; i--) {
      const point = trails[i], age = (elapsed - point.at) / 650;
      if(age >= 1) {trails.splice(i,1);continue;}
      ctx.globalAlpha = (1 - age) * .55;ctx.fillStyle = i % 3 ? cyan : violet;
      ctx.beginPath();ctx.arc(point.x * width,point.y * height,1.2 + (1 - age) * 2,0,Math.PI*2);ctx.fill();
      const next = trails[i-1];
      if(next && Math.hypot(point.x-next.x,point.y-next.y)<.16){ctx.strokeStyle=cyan;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(point.x*width,point.y*height);ctx.lineTo(next.x*width,next.y*height);ctx.stroke();}
    }
    for(let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i], age = (elapsed - pulse.at) / 1100;
      if(age >= 1) {pulses.splice(i,1);continue;}
      ctx.globalAlpha = (1-age)*.7;ctx.strokeStyle = i % 2 ? violet : cyan;ctx.lineWidth = 1.6;
      ctx.beginPath();ctx.arc(pulse.x*width,pulse.y*height,8+age*145,0,Math.PI*2);ctx.stroke();
      ctx.globalAlpha *= .4;ctx.beginPath();ctx.arc(pulse.x*width,pulse.y*height,4+age*100,0,Math.PI*2);ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function updateTerminal() {
    const phase = Math.floor(elapsed / 6500) % commands.length;
    const chars = Math.floor((elapsed % 6500) / 43);
    const text = commands[phase].slice(0, Math.max(1, chars));
    if (text === previousText) return;
    previousText = text;
    terminal.replaceChildren();
    const prompt = document.createElement('span');prompt.className = 'terminal-prompt';prompt.textContent = '❯';
    terminal.append(prompt, document.createTextNode(text));
  }
  function tick(now) {
    if (disposed) return;
    frame = 0;
    if (now - last >= 1000 / 24) {
      elapsed += last ? Math.min(now - last, 90) : 0;last = now;
      draw();updateTerminal();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);frame = 0;last = 0;
    const running = !paused && !reduced.matches && inView && !document.hidden;
    hero.dataset.motionState = running ? 'running' : reduced.matches ? 'reduced' : paused ? 'paused' : 'idle';
    hero.classList.toggle('motion-stopped', !running);
    controls.disabled = reduced.matches;
    controls.setAttribute('aria-pressed', String(paused));
    controls.innerHTML = reduced.matches ? '已减少动态效果' : paused ? '开启动效 <span aria-hidden="true">▶</span>' : '暂停动效 <span aria-hidden="true">Ⅱ</span>';
    if (!running) {hero.style.setProperty('--pointer-x','50%');hero.style.setProperty('--pointer-y','50%');hero.style.setProperty('--tilt-x','0deg');hero.style.setProperty('--tilt-y','0deg');}
    if (!running) {trails.length=0;pulses.length=0;pointer.active=false;}
    if (reduced.matches) {terminal.innerHTML = originalTerminal;previousText = '';}
    draw();if (running) frame = requestAnimationFrame(tick);
  }
  controls.addEventListener('click', () => {
    paused = !paused;
    try {localStorage.setItem('zhixu-home-motion-v1', paused ? 'paused' : 'running');} catch {}
    window.dispatchEvent(new CustomEvent('zhixu-motion-change',{detail:{paused}}));
    sync();
  }, {signal:signal.signal});
  hero.addEventListener('pointermove', event => {
    if (!finePointer.matches || hero.dataset.motionState !== 'running') return;
    const rect = hero.getBoundingClientRect();pointer = {x:(event.clientX - rect.left)/rect.width,y:(event.clientY - rect.top)/rect.height,active:true};
    hero.style.setProperty('--pointer-x', `${pointer.x * 100}%`);hero.style.setProperty('--pointer-y', `${pointer.y * 100}%`);
    hero.style.setProperty('--tilt-x', `${(pointer.y - .5) * -12}deg`);hero.style.setProperty('--tilt-y', `${(pointer.x - .5) * 16}deg`);
    trails.push({x:pointer.x,y:pointer.y,at:elapsed});if(trails.length>18)trails.shift();
  }, {passive:true,signal:signal.signal});
  hero.addEventListener('pointerleave', () => {pointer.active = false;hero.style.setProperty('--pointer-x','50%');hero.style.setProperty('--pointer-y','50%');hero.style.setProperty('--tilt-x','0deg');hero.style.setProperty('--tilt-y','0deg');}, {signal:signal.signal});
  hero.addEventListener('pointerdown', event => {
    if(hero.dataset.motionState !== 'running' || event.target.closest('a,button,input,select,textarea')) return;
    const rect = hero.getBoundingClientRect();
    pulses.push({x:(event.clientX-rect.left)/rect.width,y:(event.clientY-rect.top)/rect.height,at:elapsed});
    if(pulses.length>4)pulses.shift();
  },{passive:true,signal:signal.signal});
  window.addEventListener('zhixu-motion-change',event=>{paused=event.detail.paused;sync();},{signal:signal.signal});
  document.addEventListener('visibilitychange',sync,{signal:signal.signal});
  reduced.addEventListener('change',sync,{signal:signal.signal});
  const resizeObserver = new ResizeObserver(resize);resizeObserver.observe(hero);
  const visibleObserver = new IntersectionObserver(entries => {inView = entries[0].isIntersecting;sync();},{threshold:0});visibleObserver.observe(hero);
  const themeObserver = new MutationObserver(() => {colors();draw();});themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  colors();resize();sync();
  return () => {disposed = true;cancelAnimationFrame(frame);signal.abort();resizeObserver.disconnect();visibleObserver.disconnect();themeObserver.disconnect();};
}
