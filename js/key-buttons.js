(function(d) {
  // 1. individual keys; 2. modifiers; 3. normal keys
  const k1 = 'Esc|Tab|Enter|PageUp|PageDown|Up|Down|Left|Right|' +
              Array(12).fill().map((v, i) => 'F' + (i + 1)).join('|'),
        k2 = 'Ctrl|Control|Shift|Alt|Cmd|Command|fn',
        k3 = '[a-zA-Z0-9]|Click',
        r1 = new RegExp('^(' + k1 + '|' + k2 + ')$'),
        r2 = new RegExp('^(' + k2 + ') [/+] '),
        r3 = new RegExp('^(' + [k1, k2, k3].join('|') + ')( [/+] )(.*)');
  d.querySelectorAll(':not(pre) > code').forEach(el => {
    if (el.childElementCount > 0) return;
    let t = el.innerText;
    if (r1.test(t)) {
      el.outerHTML = '<kbd>' + t + '</kbd>';
      return;
    }
    if (!r2.test(t)) return;
    let t2 = ''; t += ' + ';
    while (r3.test(t)) {
      t2 += t.replace(r3, '<kbd>$1</kbd>$2');
      t = t.replace(r3, '$3');
    }
    if (t === '') el.outerHTML = t2.replace(/ \+ $/, '');
  });
})(document);
