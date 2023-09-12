// <code>$math$</code> to \(math\), and <code>$$math$$</code> to $$math$$:
// https://yihui.org/en/2018/07/latex-math-markdown/
[...document.getElementsByTagName('code')].forEach(code => {
  // skip <pre> tags and <code> that has children or the nolatex class
  if (code.parentNode.tagName === 'PRE' || code.childElementCount > 0 || code.classList.contains('nolatex')) return;
  let text = code.textContent;
  if (/^\$[^$]/.test(text) && /[^$]\$$/.test(text)) {
    text = text.replace(/^\$/, '\\(').replace(/\$$/, '\\)');
    code.textContent = text;
  }
  if (/^\\\((.|\s)+\\\)$/.test(text) || /^\\\[(.|\s)+\\\]$/.test(text) ||
      /^\$(.|\s)+\$$/.test(text) ||
      /^\\begin\{([^}]+)\}(.|\s)+\\end\{[^}]+\}$/.test(text)) {
    code.outerHTML = code.innerHTML;  // remove <code></code>
  }
});
