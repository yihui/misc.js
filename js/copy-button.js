// add a button to elements to copy their content: https://yihui.org/en/2023/09/copy-button/
(d => {
  const cfg = d.currentScript?.dataset;
  d.querySelectorAll(cfg?.selector || 'pre>code').forEach(el => {
    const btn = d.createElement('span'), cls = btn.classList,
      c1 = 'copy-success', c2 = 'copy-fail';
    btn.className = 'copy-button';
    // temporarily add a class to the button (as a feedback to copy action)
    function feedback(c) {
      cls.add(c); setTimeout(() => cls.remove(c), 1000);
    }
    btn.onclick = () => navigator.clipboard.writeText(el.innerText).then(
      () => feedback(c1), () => feedback(c2)
    );
    // add the button to <pre> for <code> because <code>'s innerHTML' may be
    // changed later, e.g., by syntax highlighting libraries
    const p = (el.tagName === 'CODE' && el?.parentNode.tagName === 'PRE') ? el.parentNode : el;
    // add the button only if it has not been added
    p.querySelector('.copy-button') || p.append(btn);
    getComputedStyle(p).position === 'static' && (p.style.position = 'relative');
  });
})(document);
