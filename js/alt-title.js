[...document.getElementsByTagName('img')].forEach(el => {
  if (!el.title) el.title = el.alt;
});
