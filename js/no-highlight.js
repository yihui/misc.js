document.querySelectorAll('pre > code:only-child').forEach(code => {
  const cls = code.className;
  if (cls === '' || cls === 'hljs') {
    code.className = 'nohighlight';
  } else if (/^language-/.test(cls) && !/hljs/.test(cls)) {
    code.className += ' hljs';
  }
})
