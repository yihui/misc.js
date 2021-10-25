((d) => {
  const cls_list = 'faq-list', cls_clicked = 'faq-clicked';
  function faq(el) {
    el.classList.add(cls_list);

    const btn = d.createElement('span');
    let status = false;
    btn.className = 'faq-button';
    btn.innerText = '⊕';
    btn.onclick = function() {
      status = !status;
      this.innerText = status ? '⊖' : '⊕';
      for (const li of el.children) {
        li.classList.toggle(cls_clicked, status);
      }
    };
    el.before(btn);

    for (const li of el.children) {
      li.onclick = function(e) {
        this.classList.toggle(cls_clicked);
      };
    }
  }

  for (const ol of d.querySelectorAll('ol')) {
    // ignore lists in footnotes
    if (ol.parentElement.classList.contains('footnotes')) continue;
    let ls = ol.classList;
    (ls.length === 0 || ls.contains(cls_list)) && faq(ol);
  }
})(document);
