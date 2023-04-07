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
})(document);
