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
})(document);
