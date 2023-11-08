(d => {
  const r = /^(https?:)?\/\//;
  d.querySelectorAll('a').forEach(a => {
    if (!a.title) a.title = a.href;
    if (!r.test(a.getAttribute('href'))) return;
    // add _blank target to external links
    a.target = '_blank';
    // shorten bare links
    if (a.childElementCount === 0 && r.test(a.innerText)) {
      a.innerText = a.innerText.replace(r, '').replace(/(.+)#.*$/, '$1');
    }
  })
})(document);
