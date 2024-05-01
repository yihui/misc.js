// find <h[1-6] class="appendix"> and either add the class 'appendix' to
// wrappers of appendix elements or create a new <div> next to the parent
// element to hold all appendix elements
(d => {
  const h = d.querySelector([1, 2, 3, 4, 5, 6].map(i => `h${i}.appendix`).join(','));
  if (!h) return;
  h.classList.remove('appendix');
  // if h is in a wrapper whose next sibling has the same class, simply add class to wrappers
  const p1 = h.parentNode; let p2 = p1, wrapper = false;
  while (p1) {
    p2 = p2.nextElementSibling;
    if (!p2 || p1.tagName !== p2.tagName || p1.className !== p2.className) break;
    p2.classList.add('appendix');
    wrapper = true;
  }
  if (wrapper) {
    p1.classList.add('appendix');
    return;
  }
  // create a new div instead
  const a = d.createElement('div');
  a.className = 'appendix';
  a.append(h.cloneNode(true));
  while(h.nextSibling) {
    a.append(h.nextSibling);
  }
  h.parentNode.tagName === 'BODY' ? d.body.append(a) : h.parentNode.after(a);
  h.remove();
})(document);
