// turn <div class="callout-*"> to <fieldset><legend>*
document.querySelectorAll('div[class^="callout-"]').forEach(el => {
  const f = document.createElement('fieldset');
  f.className = el.className; f.classList.add('callout');
  // if the data-legend attribute exists, use its value as legend, otherwise use the class name
  f.insertAdjacentHTML('afterbegin', '<legend></legend>');
  f.firstChild.dataset.legend = el.dataset.legend || el.classList[0].replace('callout-', '');
  el.after(f);
  f.append(...el.children);
  el.remove();
});
