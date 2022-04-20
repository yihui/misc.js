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
    s.innerHTML = s.innerHTML
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/(^|[^"])(https?:\/\/)([-a-zA-Z0-9%._=/\+]+)(#)?([-a-zA-Z0-9%._=\+]+)?/g, '$1<a href="$2$3$4$5">$3$4</a>');
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
