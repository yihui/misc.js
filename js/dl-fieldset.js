// convert <dl><dt>Title</dt><dd>Content</dd></dl>
// to <fieldset><legend>Title</legend>Content</fieldset>;
// see documentation at: https://yihui.org/en/2023/11/dl-fieldset/
document.querySelectorAll('dl').forEach(dl => {
  if (dl.childElementCount !== 2) return;
  const dt = dl.children[0], dd = dl.children[1];
  if (dt.tagName !== 'DT' || dd.tagName !== 'DD') return;
  dt.outerHTML = dt.outerHTML.replace(/^<dt(>[\s\S]*<\/)dt>$/, '<legend$1legend>');
  dd.outerHTML = dd.innerHTML;
  dl.outerHTML = dl.outerHTML.replace(/^<dl(>[\s\S]*<\/)dl>$/, '<fieldset$1fieldset>');
});
