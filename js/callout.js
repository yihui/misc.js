// turn <div class="callout-*"> to <fieldset><legend>*
document.querySelectorAll('div[class^="callout-"]').forEach(el => {
  const f = document.createElement('fieldset');
  f.className = el.className;
  // if the data-legend attribute exists, use its value as legend, otherwise use the class name
  const l = el.dataset.legend || el.classList[0].replace('callout-', '');
  f.insertAdjacentHTML('afterbegin', `<legend>${l.toUpperCase()}</legend>`);
  el.after(f);
  f.append(...el.children);
  el.remove();
});
