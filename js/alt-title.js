[...document.getElementsByTagName('img')].forEach(el => {
  if (el.alt) {
    el.alt = el.alt.replace(/\n/g, ' ');
    if (!el.title) el.title = el.alt;
  }
});
