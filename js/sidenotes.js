// move footnotes (ids start with fn) and citations (ids start with ref-) to sidenotes
(d => {
  d.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(el => {
    // find <a> that points to note id in body
    const h = `a[href="#${el.id}"]`,
      a = d.querySelector(`${h} > sup, sup > ${h}, .citation > ${h}`);
    if (!a) return;
    const a2 = a.parentNode;
    (a.tagName === 'A' ? a : a2).removeAttribute('href');
    const s = d.createElement('div');  // insert a side div next to a2 in body
    s.className = 'side side-right';
    if (/^fn/.test(el.id)) {
      s.innerHTML = el.innerHTML;
      // add footnote number
      s.firstElementChild.insertAdjacentHTML('afterbegin', `<span class="bg-number">${a.innerText}</span> `);
      s.querySelector('a[href^="#fnref"]')?.remove();  // remove backreference
    } else {
      s.innerHTML = el.outerHTML;
    }
    // insert note after the <sup> or <span> that contains a
    a2.after(s);
    a2.classList.add('note-ref');
    el.remove();
  });
  // remove the footnote/citation section if it's empty now
  d.querySelectorAll('.footnotes, #refs').forEach(el => {
    /^\s*$/.test(el.innerText) && el.remove();
  });
  // also add side classes to TOC
  d.getElementById('TOC')?.classList.add('side', 'side-left');
  // if a sidenote collapses with any fullwidth element, remove the side class
  const sides = d.querySelectorAll('.side.side-right, .side.side-left'), fulls = [];
  d.querySelectorAll('.fullwidth').forEach(el => {
    fulls.push([el, el.getBoundingClientRect()]);
  });
  // add a class to document body if it has sidenotes
  sides.length && d.body.classList.add('has-sidenotes');
  sides.forEach(s => {
    const r1 = s.getBoundingClientRect();
    for (let f of fulls) {
      const r2 = f[1];
      if (!(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom)) {
        f[0].classList.remove('fullwidth');
      }
    }
  });
})(document);
