((d) => {
  const cls_list = 'faq-list', cls_clicked = 'faq-clicked';
  function faq(el, id) {
    el.classList.add(cls_list);

    // a button to collapse/expand all FAQs
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

    // add anchor links after questions
    const lis = el.children;
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i], hash = 'faq-' + (id ? id + '-' : '') + (i + 1);
      li.firstElementChild.innerHTML += ' <span class="anchor" id="' + hash +
        '"><a href="#' + hash + '">#</a></span>';
      if (location.hash === '#' + hash) {
        li.scrollIntoView();
        li.classList.add(cls_clicked);
      }
      li.onclick = function(e) {
        this.classList.toggle(cls_clicked);
      };
    }
  }

  // ignore lists in footnotes, and lists must be direct child of some
  // block-level elements such as <div>
  const ols = d.querySelectorAll(['div', 'main', 'section', 'article'].map(
    (x) => x + ':not(.footnotes) > ol'
  ).join(','));
  for (let i = 0; i < ols.length; i++) {
    let ol = ols[i];
    let ls = ol.classList;
    (ls.length === 0 || ls.contains(cls_list)) && faq(ol, ols.length > 1 ? i + 1 : 0);
  }
})(document);
