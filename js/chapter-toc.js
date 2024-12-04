// copy chapter TOC to each chapter's first page (under h1)
(d => {
  d.querySelector('.chapter-toc') || d.querySelectorAll('#TOC > ul > li > a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href'), h = d.getElementById(id.replace(/^#/, ''));
    if (h?.tagName !== 'H1') return;
    const h2 = h.nextElementSibling;
    if (h2?.tagName === 'H1') return;
    const u = a.nextElementSibling;
    if (u?.tagName === 'UL') {
      const toc = d.createElement('div');
      toc.className = 'chapter-toc'; toc.id = 'TOC';
      toc.append(u.cloneNode(true));
      toc.firstChild.className = a.parentNode.parentNode.className;
      (h2?.classList.contains('epigraph') ? h2 : h).after(toc);
    }
  });
})(document);
