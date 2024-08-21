// move elements into page boxes such that each box contains as many elements as
// possible and will not exceed the given size (e.g. A4 paper)
(d => {
  function  $(s, el = d) { return el.querySelector(s); }
  function $$(s, el = d) { return el.querySelectorAll(s); }

  const tpl = d.createElement('div');
  tpl.className = 'pagesjs-page';
  tpl.innerHTML = `<div class="pagesjs-header"></div>
<div class="pagesjs-body"></div>
<div class="pagesjs-footer"></div>`;
  let box, box_body, H;
  function newPage(el) {
    box = el || tpl.cloneNode(true); box_body = box.children[1];
    return box;
  }
  function fill(el) {
    // if the element is already a page, just use it as the box
    if (el.classList.contains('pagesjs-page')) {
      box.after(el);
      !$('.pagesjs-body', el) && el.insertAdjacentHTML('afterbegin', tpl.innerHTML);
      // if current element is not empty, fill its content into the box
      if (el.childElementCount > 3) {
        el.children[1].append(...[...el.children].slice(3));
        el.after(newPage());  // create a new empty page
      } else {
        newPage(el);
      }
      return;
    }
    // create a new box in case of too much content (exceeding original height)
    if (box.scrollHeight > H) {
      const box2 = tpl.cloneNode(true), box_body2 = box2.children[1];
      box.after(box2);
      // if there's more than one child in the box, move the last child out
      box_body.childElementCount > 1 && box_body2.append(box_body.lastElementChild);
      [box, box_body] = [box2, box_body2];
    }
    box_body.append(el);
  }

  // use data-short-title of a header if exists, and fall back to inner text
  function shortTitle(h) {
    return h && (h.dataset['shortTitle'] || h.innerText);
  }
  const main = shortTitle($('h1.title, .frontmatter h1, .title, h1')),  // main title
    ps = ($$('h1').length > 1 ? 'h1' : 'h2') + ':not(.frontmatter *)',  // page title selector
    tb = ['top', 'bottom'].map(i => {
      const v = getComputedStyle(d.documentElement).getPropertyValue(`--paper-margin-${i}`);
      return +v.replace('px', '') || 0;
    });  // top/bottom page margin

  // calculate how many new pages we need for overflowed content (this is just
  // an estimate; if not accurate, use <div class="pagesjs-page" data-pages-offset="N">
  // to provide a number manually)
  function calcPages(box) {
    let n = +box.dataset['pagesOffset'];
    if (n) return n;
    const h = box.scrollHeight;
    n = Math.ceil(h/H);
    if (n <= 1) return n;
    // consider top/bottom page margin and table headers (which may be repeated on each page)
    const m = tb.concat([...$$('thead', box)].map(el => +el.offsetHeight)).reduce((m1, m2) => m1 + m2);
    if (!m) return n;
    function newPages() { return Math.ceil((h + (n - 1) * m)/H); }
    let n2 = newPages();
    while (n2 > n) {
      n = n2; n2 = newPages();
    }
    return n;
  }

  function paginate() {
    const cls = d.body.classList;
    if (cls.contains('pagesjs')) return;  // already paginated

    cls.add('pagesjs');
    d.body.insertAdjacentElement('afterbegin', newPage());
    H = box.clientHeight;

    $$('.frontmatter, #TOC, .abstract').forEach(fill);
    $$('.body').forEach(el => {
      [...el.children].map(fill);
      el.childElementCount === 0 && el.remove();
    });

    // add page number, title, etc. to data-* attributes of page elements
    let page_title, i = 0;
    $$('.pagesjs-page').forEach(box => {
      if (box.innerText === '') return box.remove();  // remove empty pages
      const N = calcPages(box);
      if (N > 1) box.classList.add('page-multiple');
      i += N;
      const info = {
        'pageNumber': i, 'mainTitle': main, 'pageTitle': page_title
      };
      [box.children[0], box.children[2]].forEach(el => {
        for (const key in info) info[key] && (el.dataset[key] = info[key]);
      });
      // find page title for next page
      page_title = shortTitle([...$$(ps, box)].pop()) || page_title;
    });
  }
  addEventListener('beforeprint', paginate);
  // persistent pagination upon page reload (press p again to cancel it)
  let pg = sessionStorage.getItem('pagesjs');
  pg && paginate();
  addEventListener('keypress', e => e.key === 'p' && (
    paginate(), pg = pg ? '' : '1', sessionStorage.setItem('pagesjs', pg), pg || location.reload()
  ));
})(document);
