// enable MathJax equation numbering: https://docs.mathjax.org/en/latest/input/tex/eqnumbers.html
(() => {
  m = window.MathJax || {};  // make sure not to override existing config
  m.tex = m.tex || {};
  m.tex.tags = m.tex.tags || 'ams';
  window.MathJax = m;
})();
