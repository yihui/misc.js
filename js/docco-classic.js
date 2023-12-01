// create a <table> of 2 columns; put <pre> in the right column and other elements in the left column
(d => {
  // find the first <pre> and assume it to be the container all code blocks
  const c1 = d.querySelector('pre')?.parentNode;
  if (!c1) return;
  c1.insertAdjacentHTML('afterend', '<div class="container"><div class="handler"></div><table><tbody><tr><td class="docs"><div class="pilwrap"><a class="pilcrow" href="#">&para;</a></div></td><td class="code"></td></tr></tbody></table></div>');
  // move <pre> into <tbody>'s second <td>, and everything else into first <td>
  const c2 = c1.nextElementSibling.querySelector('tbody');
  let c3 = c2.lastElementChild, c4 = c3.cloneNode(true), newRow = false;
  while (true) {
    const el = c1.firstElementChild;
    if (!el) break;
    if (el.tagName === 'PRE') {
      c3.lastElementChild.append(el);
      newRow = true;
    } else {
      if (newRow) {
        c3 = c4.cloneNode(true);
        c2.append(c3);
        newRow = false;
      }
      c3.firstElementChild.append(el);
    }
  }
  c1.remove();
  // if a cell contains plots, shift all code cells from there down by one row
  for (let row of c2.rows) {
    if (row.querySelector('td.docs img')) {
      let prev = row.previousElementSibling;
      if (!prev) continue;
      // create a new row if necessary
      if (c2.lastElementChild.cells[1].innerText !== '') {
        c2.append(c4.cloneNode(true));
      }
      // move the last empty code cell before the previous code cell
      prev.cells[0].after(c2.lastElementChild.cells[1]);
      while (prev) {
        const cells = prev.nextElementSibling?.cells;
        if (!cells) break;
        cells[0].after(prev.lastElementChild);
        prev = prev.nextElementSibling;
      }
      break;
    }
  }
  [...c2.rows].forEach((row, i) => {
    row.id = 'row' + (i + 1);
    row.querySelector('.pilcrow').href = '#' + row.id;
  });
})(document);
