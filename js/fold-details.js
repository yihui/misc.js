// fold elements with <details>: https://yihui.org/en/2023/09/code-folding/
(d => {
  const cfg = d.currentScript?.dataset, cls = 'folder';
  d.querySelectorAll(cfg?.selector || 'pre>code[class],pre[class]').forEach(el => {
    const s1 = d.createElement('details'), s2 = d.createElement('summary');
    s1.className = cls; s1.open = cfg?.open;
    s2.innerText = (cfg?.label || 'Details') + (cfg?.tagName ? ` <${el.tagName}>` : '');
    // special case: for <code>, put its parent <pre> inside <details>
    if (el.tagName === 'CODE' && el.parentNode.tagName === 'PRE') el = el.parentNode;
    s1.append(s2);
    el.before(s1);
    s1.append(el);
  });

  // add a button to the page to toggle all <details> elements
  if (!cfg?.hasOwnProperty('button')) return;
  const p = d.querySelector(cfg.parent);
  let btn = d.querySelector(cfg.button);
  if (!btn && !p) return;  // must provide either a button or a container
  if (!btn) {
    btn = d.createElement('button');
    btn.id = 'toggle-all';
    btn.innerText = cfg.buttonLabel || 'Toggle Details';
    p.insertAdjacentElement(cfg.position || 'afterbegin', btn);
  }
  btn.onclick = (e) => {
    d.querySelectorAll(`details.${cls}`).forEach(el => {
      el.toggleAttribute('open');
    });
  };
})(document);
