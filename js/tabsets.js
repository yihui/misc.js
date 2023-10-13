// find an element with class `tabset` and convert its subsequent headings to tabs;
// see documentation at: https://yihui.org/en/2023/10/section-tabsets/
document.querySelectorAll('.tabset').forEach(h => {
  let links = h.querySelectorAll(':scope > .tab-link'),
      panes = h.querySelectorAll(':scope > .tab-pane');
  // using headings to create a tabset later if it's empty
  if (links.length === 0) {
    links = []; panes = [];
  }
  function activate(i) {
    function a(x, i) {
      x.forEach((el, k) => el.classList[k === i ? 'add' : 'remove']('active'));
    }
    a(links, i); a(panes, i);
  }
  let n = -1, el = h.nextSibling, p;
  if (links instanceof Array) while (el) {
    if (el.nodeName === '#comment' && el.nodeValue.trim() === `tabset:${h.id}`)
      break;  // quit after <!--tabset:id-->
    const t = el.tagName;
    if (/^H[1-6]$/.test(t)) {
      const n2 = +t.replace('H', '');
      if (n2 <= n) break;  // quit after a higher-level heading
      if (n < 0) n = n2 - 1;
      // find the next lower-level heading and start creating a tab
      if (n2 === n + 1) {
        p = document.createElement('div');
        p.className = 'tab-pane';
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
  // activate one tab initially if none is active
  let init = 0;
  links.forEach((l, i) => {
    i > 0 && links[i - 1].after(l);  // move tab links together
    l.onclick = () => activate(i);  // add the click event
    if (l.classList.contains('active')) init = i;
  });
  activate(init);
});
