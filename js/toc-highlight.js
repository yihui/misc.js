// highlight a TOC item when scrolling to a corresponding section heading
(d => {
  // assume TOC has these possible IDs (we can also consider other selectors)
  const toc = d.querySelector('#TableOfContents, #TOC');
  if (!toc) return;
  const links = toc.querySelectorAll('a');
  if (!links.length) return;

  // create a new Intersection Observer instance
  const observer = new IntersectionObserver(els => els.forEach(el => {
    const id = el.target.id;
    id && el.isIntersecting && links.forEach(a => {
      a.classList[(a.getAttribute('href') === '#' + id) ? 'add' : 'remove']('active');
    });
  }));

  // observe all section headings
  d.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
    h.nodeType === 1 && observer.observe(h);
  });
})(document);
