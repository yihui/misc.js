// toggle output of source code by clicking on source code
(() => {
  const blocks = [];
  document.querySelectorAll('pre>code[class^=language-],pre[class^=language-]').forEach(el => {
    // if <code> is selected, use its parent
    if (el.tagName === 'CODE' && el.parentNode.tagName === 'PRE') el = el.parentNode;
    blocks.indexOf(el) < 0 && blocks.push(el);
  });
  let s1, s2;  // local and global show/hide status
  blocks.forEach(el => {
    el.onclick = e => {
      let sb = el.nextElementSibling;
      while (sb && blocks.indexOf(sb) < 0) {
        s1 = s2;  // use global status if exists
        if (s1 === undefined) s1 = sb.style.display === '';
        sb.style.display = s1 ? 'none' : '';
        sb = sb.nextElementSibling;
      }
      // Alt + Click to toggle all output
      e.altKey && (s2 = s1, blocks.forEach(b => b !== el && b.click()), s2 = undefined);
      s1 = undefined;
    };
  });
})();
