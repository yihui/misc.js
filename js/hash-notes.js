// convert <!--# comments --> to <span class="hash-notes">comments</span>
(function(d) {
  function toSpan(el) {
    const t = el.textContent, r = /^#[\s\n]+([\s\S]+)[\s\n]+$/;
    if (!r.test(t)) return;
    d.body.classList.add('has-notes', 'hide-notes');
    // use <p> if the comment's parent is not <p>; otherwise use inline <span>
    const s = d.createElement(el.parentNode.nodeName === 'P' ? 'span' : 'p');
    s.className = 'hash-note';
    s.innerText = t.replace(r, '$1');
    el.before(s);
    el.remove();
  };
  function findComments(el) {
    el.childNodes.forEach(node => {
      node.nodeType === Node.COMMENT_NODE ? toSpan(node) : findComments(node);
    });
  };
  findComments(d.body);
})(document);
