// add ID to <ol> items so that they can be referenced via URL hashes like #li-N
((d) => {
  // add IDs to top-level <ol>s
  const ols = d.querySelectorAll(':not(li) > ol');
  ols.forEach((ol, i) => {
    ol.querySelectorAll(':scope > li').forEach((li, j) => {
      if (!li.id) li.id = 'li-' + (ols.length > 1 ? i + 1  + '-' : '') + (j + 1);
    });
  });
  // add IDs to all <ol>s
  d.querySelectorAll('ol').forEach((ol, i) => {
    let l = ol.parentNode, id, p;  // p: ID prefix
    if (l?.tagName === 'LI') id = l.id;
    p = (id ? id : 'li-' + (i + 1)) + '-';
    ol.querySelectorAll(':scope > li').forEach((li, j) => {
      if (!li.id) li.id = p + (j + 1);
      // Alt + Click => adding hash to URL
      li.addEventListener('click', e => {
        e.altKey && (location.hash = li.id, e.stopPropagation());
      });
    });
  });
})(document);
