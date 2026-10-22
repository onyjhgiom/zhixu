export const RESUME_TEMPLATES = Object.freeze([
  Object.freeze({
    id: 'folio', name: '云白典藏', caption: '清晰克制 · 通用专业',
    palette: Object.freeze({ background: '#ffffff', ink: '#1c2935', muted: '#64707b', accent: '#1c5966', rule: '#cbd4da', highlight: '#e8f4f7', page: '#78838e' })
  }),
  Object.freeze({
    id: 'grove', name: '雾松履历', caption: '柔和纸感 · 沉稳自然',
    palette: Object.freeze({ background: '#eef3eb', ink: '#25362c', muted: '#68796c', accent: '#557657', rule: '#cedacb', highlight: '#dce9d8', page: '#61715f' })
  }),
  Object.freeze({
    id: 'night', name: '曜石夜航', caption: '深色底稿 · 香槟金线',
    palette: Object.freeze({ background: '#202a33', ink: '#f3efe5', muted: '#b9c2c0', accent: '#d7b66d', rule: '#48575d', highlight: '#38474a', page: '#b9c2c0' })
  }),
  Object.freeze({
    id: 'terracotta', name: '绯茶新刊', caption: '暖白底色 · 赤陶细节',
    palette: Object.freeze({ background: '#fff4ed', ink: '#392b27', muted: '#826c64', accent: '#a94e3f', rule: '#e7c8bb', highlight: '#f5ded3', page: '#826c64' })
  })
]);

export const RESUME_TEMPLATE_IDS = Object.freeze(RESUME_TEMPLATES.map(template => template.id));
export function getResumeTemplate(id) { return RESUME_TEMPLATES.find(template => template.id === id) || RESUME_TEMPLATES[0]; }
export function resumeTemplateStyle(template) {
  const palette = template.palette;
  return ['--resume-paper-bg:' + palette.background, '--resume-paper-ink:' + palette.ink, '--resume-paper-muted:' + palette.muted, '--resume-paper-accent:' + palette.accent, '--resume-paper-rule:' + palette.rule, '--resume-paper-highlight:' + palette.highlight, '--resume-paper-page:' + palette.page].join(';');
}
