// fold elements with <details>: https://yihui.org/en/2023/09/code-folding/
(d => {
  const cfg = d.currentScript?.dataset, cls = 'folder'; let status = !!cfg?.open;
  d.querySelectorAll(cfg?.selector || 'pre>code[class],pre[class]').forEach(el => {
    const s1 = d.createElement('details'), s2 = d.createElement('summary');
    s1.className = cls; s1.open = status;
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
    p.insertAdjacentElement(cfg.position || 'afterbegin', btn);
  }
  const l1 = cfg.buttonLabel || 'Show Details', l2 = cfg.buttonLabel2 || 'Hide Details';
  function setText() {
    btn.innerText = status ? l2 : l1;
  }
  setText();
  btn.onclick = (e) => {
    status = !status;
    d.querySelectorAll(`details.${cls}`).forEach(el => {
      el.open = status;
    });
    setText();
  };
})(document);
