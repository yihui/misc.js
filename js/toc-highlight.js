// highlight a TOC item when scrolling to a corresponding section heading
(d => {
  // assume TOC has these possible IDs (we can also consider other selectors)
  const toc = d.querySelector('#TableOfContents, #TOC');
  if (!toc) return;
  const links = toc.querySelectorAll('a');
  if (!links.length) return;
  const lis = toc.querySelectorAll('li');

  // record which elements are currently in the viewport
  const ids = [];
  // create a new Intersection Observer instance
  const observer = new IntersectionObserver(els => els.forEach(el => {
    const id = el.target.id, i = ids.indexOf(id);
    el.isIntersecting ? ids.push(id) : (i > -1 && ids.splice(i, 1));
    const n = ids.length;
    if (!n) return;
    links.forEach(a => {
      const action = (a.getAttribute('href') === '#' + ids[n - 1])  ? 'add' : 'remove';
      a.classList[action]('active');
    });
    lis.forEach(li => {
      li.classList[li.querySelector('.active') ? 'add' : 'remove']('open');
    });
  }));

  // observe all section headings
  d.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
    h.nodeType === 1 && h.id && observer.observe(h);
  });
})(document);
