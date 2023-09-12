[...document.getElementsByTagName('code')].forEach(code => {
  if (code.parentNode.tagName === 'PRE' || code.childElementCount > 0) return;
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
