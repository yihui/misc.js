(function(d) {
  function inIFrame() {
    let iframe = true;
    try { iframe = window.self !== window.top; } catch (e) {}
    return iframe;
  };
  const a = d.querySelector('section.comments');
  if (!a) return;
  // remove the comments section when in iframe (e.g., in RStudio Viewer)
  if (inIFrame()) {
    a.remove();
    return;
  }
  // scroll to the comments section when URL contains a hash #comment-...
  location.hash.match(/^#comment-[0-9]+$/) && a.scrollIntoView();
  // create a new script and change attribute 'data-src' to 'src' (to actually load the script)
  const s = a.querySelector('script[data-src]');
  if (!s) return;
  const r = s.dataset.src, s2 = d.createElement('script');
  [...s.attributes].forEach(b => {
    s2.setAttribute(b.name, b.value);
  });
  s2.src = r;
  s.remove();
  a.appendChild(s2);
})(document);
