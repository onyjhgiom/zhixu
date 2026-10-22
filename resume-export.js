import { sanitizeResumeDocument } from './resume-core.js';
import { getResumeTemplate } from './resume-templates.js';

const WIDTH = 794, HEIGHT = 1123, MARGIN = 54, BOTTOM = HEIGHT - 55;
const FONT = '"Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif';
let pdfLibrary;
function loadPdfLibrary() {
  if (globalThis.jspdf?.jsPDF) return Promise.resolve(globalThis.jspdf.jsPDF);
  if (!pdfLibrary) pdfLibrary = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = './vendor/jspdf.umd.min.js';
    script.onload = () => globalThis.jspdf?.jsPDF ? resolve(globalThis.jspdf.jsPDF) : reject(new Error('PDF library unavailable'));
    script.onerror = () => { script.remove(); pdfLibrary = null; reject(new Error('PDF library unavailable')); };
    document.head.append(script);
  });
  return pdfLibrary;
}

export function wrapResumeText(context, text, width, measure = value => context.measureText(value).width) {
  const lines = [];
  for (const paragraph of String(text).split('\n')) {
    let line = '';
    // Latin words remain intact when possible; long URLs still wrap without clipping.
    for (const token of paragraph.match(/[A-Za-z0-9_+.#/@:-]+|[^A-Za-z0-9_+.#/@:-]/gu) || ['']) {
      if (line && measure(line + token) > width) { lines.push(line.trimEnd()); line = ''; }
      for (const character of token) {
        if (line && measure(line + character) > width) { lines.push(line.trimEnd()); line = ''; }
        line += character;
      }
    }
    lines.push(line.trimEnd());
  }
  return lines;
}

export async function renderResumePages(raw, { scale = 2 } = {}) {
  const doc = sanitizeResumeDocument(raw);
  if (!doc) throw new Error('No resume document');
  const template = getResumeTemplate(doc.templateId), palette = template.palette;
  await document.fonts.ready;
  let portrait;
  if (doc.photo) portrait = await new Promise((resolve, reject) => {
    const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = doc.photo;
  });
  const pages = [];
  const escaped = doc.keywords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length);
  const keywordPattern = escaped.length ? new RegExp('(?<![A-Za-z0-9_])(?:' + escaped.join('|') + ')(?![A-Za-z0-9_])', 'giu') : null;
  function runs(text) {
    if (!keywordPattern) return [{ text, bold: false }];
    const result = []; let start = 0;
    for (const match of text.matchAll(keywordPattern)) {
      result.push({ text: text.slice(start, match.index), bold: false }, { text: match[0], bold: true }); start = match.index + match[0].length;
    }
    result.push({ text: text.slice(start), bold: false }); return result;
  }
  let canvas, context, y;
  function newPage() {
    canvas = document.createElement('canvas'); canvas.width = Math.round(WIDTH * scale); canvas.height = Math.round(HEIGHT * scale);
    context = canvas.getContext('2d'); context.scale(scale, scale);
    context.fillStyle = palette.background; context.fillRect(0, 0, WIDTH, HEIGHT);
    if (template.id === 'night') { context.fillStyle = palette.accent; context.fillRect(0, 0, WIDTH, 8); }
    if (template.id === 'terracotta') { context.fillStyle = palette.accent; context.fillRect(0, 0, WIDTH, 5); }
    if (template.id === 'grove') { context.fillStyle = palette.accent; context.fillRect(MARGIN - 18, 30, 3, HEIGHT - 60); }
    context.textBaseline = 'top';
    pages.push(canvas); y = MARGIN;
  }
  function font(size = 13, weight = 400) { context.font = `${weight} ${size}px ${template.id === 'terracotta' && size >= 30 ? 'Georgia, ' : ''}${FONT}`; }
  function space(height) { if (y + height > BOTTOM && y > MARGIN) newPage(); }
  function rule(color = palette.rule, weight = 1) { context.strokeStyle = color; context.lineWidth = weight; context.setLineDash(template.id === 'terracotta' && weight === 1 ? [2, 3] : []); context.beginPath(); context.moveTo(MARGIN, y); context.lineTo(WIDTH - MARGIN, y); context.stroke(); context.setLineDash([]); }
  function textBlock(text, { size = 13, weight = 400, color = palette.ink, indent = 0, width = WIDTH - MARGIN * 2 - indent, leading = size * 1.7, bullet = false } = {}) {
    const measure = value => runs(value).reduce((sum, run) => { font(size, run.bold ? Math.max(weight, 650) : weight); return sum + context.measureText(run.text).width; }, 0);
    font(size, weight); const lines = wrapResumeText(context, text, width, measure);
    for (let index = 0; index < lines.length; index++) {
      space(leading); font(size, weight); context.fillStyle = color;
      if (bullet && index === 0) { context.beginPath(); context.arc(MARGIN + 4, y + size * .58, 1.6, 0, Math.PI * 2); context.fill(); }
      let x = MARGIN + indent;
      for (const run of runs(lines[index])) { font(size, run.bold ? Math.max(weight, 650) : weight); context.fillText(run.text, x, y); x += context.measureText(run.text).width; }
      y += leading;
    }
  }
  newPage();
  const identityWidth = WIDTH - MARGIN * 2 - (portrait ? 108 : 0), headerY = y;
  textBlock(doc.name, { size: 30, weight: 700, color: template.id === 'night' ? palette.accent : palette.ink, width: identityWidth, leading: 40 });
  if (doc.headline) textBlock(doc.headline, { size: 14, width: identityWidth, leading: 24 });
  if (doc.contacts.some(Boolean)) textBlock(doc.contacts.filter(Boolean).join('  |  '), { size: 11, color: palette.muted, width: identityWidth, leading: 20 });
  if (portrait) { context.strokeStyle = palette.accent; context.lineWidth = 1.5; context.strokeRect(WIDTH - MARGIN - 77, headerY - 1, 78, 97); context.drawImage(portrait, WIDTH - MARGIN - 76, headerY, 76, 95); y = Math.max(y, headerY + 95); }
  y += 14; rule(palette.accent, template.id === 'folio' ? 2 : 1.5); y += 18;
  if (doc.summary) { textBlock(doc.summary); y += 10; }
  for (const section of doc.sections) {
    space(85); y += 10;
    if (template.id === 'grove') { context.fillStyle = palette.accent; context.fillRect(MARGIN, y, 3, 25); }
    textBlock(section.title, { size: 16, weight: 700, color: ['night', 'terracotta'].includes(template.id) ? palette.accent : palette.ink, indent: template.id === 'grove' ? 10 : 0, leading: 27 }); rule(); y += 10;
    for (const item of section.items) {
      space(60);
      if (item.title) textBlock(item.title, { size: 14, weight: 650, leading: 24 });
      if (item.subtitle || item.date) textBlock([item.subtitle, item.date].filter(Boolean).join('  |  '), { size: 12, color: palette.muted, leading: 22 });
      for (const bullet of item.bullets) { textBlock(bullet.text, { indent: 15, bullet: true }); y += 3; }
      y += 9;
    }
  }
  pages.forEach((page, index) => {
    const ctx = page.getContext('2d'); ctx.font = `10px ${FONT}`; ctx.fillStyle = palette.page; ctx.textAlign = 'center'; ctx.fillText(`${index + 1} / ${pages.length}`, WIDTH / 2, HEIGHT - 32);
  });
  return pages;
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
export async function downloadResume(doc, format) {
  if (!['pdf', 'png'].includes(format)) throw new Error('Unsupported format');
  const pages = await renderResumePages(doc);
  const name = [doc.name, doc.headline, '简历'].filter(Boolean).join('-').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '').slice(0, 100) || '简历';
  if (format === 'pdf') {
    const JsPDF = await loadPdfLibrary();
    const pdf = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    pdf.setProperties({ title: name, creator: 'Zhixu' });
    pages.forEach((page, index) => { if (index) pdf.addPage('a4', 'portrait'); pdf.addImage(page, 'PNG', 0, 0, 210, 297, undefined, 'FAST'); });
    saveBlob(pdf.output('blob'), `${name}.pdf`);
  } else if (pages.length === 1) {
    const blob = await new Promise(resolve => pages[0].toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Image generation failed');
    saveBlob(blob, `${name}.png`);
  } else {
    const { zipSync } = await import('./vendor/fflate.browser.js');
    const files = {};
    for (const [index, page] of pages.entries()) {
      const blob = await new Promise(resolve => page.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Image generation failed');
      files[`${name}-${index + 1}.png`] = new Uint8Array(await blob.arrayBuffer());
    }
    saveBlob(new Blob([zipSync(files, { level: 0 })], { type: 'application/zip' }), `${name}-PNG.zip`);
  }
  return { pages: pages.length };
}
