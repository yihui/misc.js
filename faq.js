((d) => {
  function faq(el) {
    el.classList.add('faq-list');

    const btn = d.createElement('span');
    let status = false;
    btn.className = 'faq-button';
    btn.innerText = '⊕';
    btn.onclick = function() {
      status = !status;
      this.innerText = status ? '⊖' : '⊕';
      for (const li of el.children) {
        li.classList.toggle('faq-clicked', status);
      }
    };
    el.before(btn);

    for (const li of el.children) {
      li.onclick = function(e) {
        this.classList.toggle('faq-clicked');
      };
    }
  }
  faq(d.querySelector('ol'));
})(document);
