// find <h[1-6] class="appendix"> and create a new <div> next to the parent
// element to hold all appendix elements
(d => {
  const h = d.querySelector([1, 2, 3, 4, 5, 6].map(i => `h${i}.appendix`).join(','));
  if (!h) return;
  h.classList.remove('appendix');
  const a = d.createElement('div');
  a.className = 'appendix';
  a.append(h.cloneNode(true));
  h.parentNode.after(a);
  while(h.nextSibling) {
    a.append(h.nextSibling);
  }
  h.remove();
})(document);
