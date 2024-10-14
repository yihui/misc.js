// find an element with class `tabset` and convert its subsequent bullet list or headings to tabs;
// see documentation at: https://yihui.org/en/2023/10/section-tabsets/
document.querySelectorAll('.tabset').forEach(h => {
  const links = [...h.querySelectorAll(':scope > .tab-link')],
        panes = [...h.querySelectorAll(':scope > .tab-pane')];
  function activate(i) {
    function a(x, i) {
      x.forEach((el, k) => el.classList[k === i ? 'add' : 'remove']('active'));
    }
    a(links, i); a(panes, i);
  }
  function newEl(tag, cls) {
    const el = document.createElement(tag);
    el.className = cls;
    return el;
  }
  function isHeading(el) {
    return /^H[1-6]$/.test(el.tagName);
  }
  function isEmpty(el) {
    return el.innerHTML.trim() === '';
  }
  // if the tabset is heading or empty div, use next sibling, otherwise use first child
  let n = -1, p, el = (isHeading(h) || isEmpty(h)) ? h.nextElementSibling : h.firstElementChild;
  // if el is <ul>, try to convert it to tabset
  if (links.length === 0 && el?.tagName === 'UL') {
    [...el.children].forEach(li => {
      const l = li.firstElementChild;
      if (!l) return;
      const l2 = newEl('div', 'tab-link');
      l2.append(l);
      l.outerHTML = l.innerHTML;
      if (/<!--active-->/.test(l2.innerHTML)) l2.classList.add('active');
      el.before(l2);
      const p = newEl('div', 'tab-pane');
      l2.after(p);
      [...li.children].forEach(l => p.append(l));
      links.push(l2); panes.push(p);
    });
    el.remove();
  }
  // create a tabset using headings if the above didn't work
  if (links.length === 0) while (el) {
    // convert headings to tabs
    if (el.nodeName === '#comment' && el.nodeValue.trim() === `tabset:${h.id}`)
      break;  // quit after <!--tabset:id-->
    if (isHeading(el)) {
      const n2 = +el.tagName.replace('H', '');
      if (n2 <= n) break;  // quit after a higher-level heading
      if (n < 0) n = n2 - 1;
      // find the next lower-level heading and start creating a tab
      if (n2 === n + 1) {
        p = newEl('div', 'tab-pane');
        el.after(p);
        el.classList.add('tab-link');
        el.querySelector('.anchor')?.remove();
        el.outerHTML = el.outerHTML.replace(/^<h[1-6](.*)h[1-6]>$/, '<div$1div>');
        el = p.previousElementSibling;
        links.push(el); panes.push(p);
        el = p.nextSibling;
        continue;
      }
    }
    if (p) {
      p.append(el);
      el = p;
    }
    el = el.nextSibling;
  }
  // if the initial tabset container is empty, move links and panes into it
  if (isEmpty(h)) {
    links.forEach(l => h.append(l));
    panes.forEach(p => h.append(p));
  }
  // activate one tab initially if none is active
  let init = 0;
  links.forEach((l, i) => {
    i > 0 && links[i - 1].after(l);  // move tab links together
    l.onclick = () => activate(i);  // add the click event
    if (l.classList.contains('active')) init = i;
  });
  activate(init);
});
