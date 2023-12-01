// add 'language-' prefix to <code> inside <pre> for syntax highlighters to work (e.g., prism.js)
document.querySelectorAll('pre').forEach(pre => {
  const code = pre.querySelector('code');
  // no code or already highlighted
  if (!code || code.querySelector('span')) return;
  const c1 = pre.className, c2 = code.className, r = /^lang(uage)?-/;
  // at least one of pre or code must have className, which shouldn't start with lang prefix
  if (!(c1 || c2) || r.test(c1) || r.test(c2)) return;
  code.className = 'language-' + (c2 || c1);
});
