// move elements into page boxes such that each box contains as many elements as
// possible and will not exceed the given size (e.g. A4 paper)
(d => {
  function  $(s, el = d) { return el?.querySelector(s); }
  function $$(s, el = d) { return el ? el.querySelectorAll(s) : []; }

  const tpl = d.createElement('div'), book = $$('h1').length > 1;
  tpl.className = 'pagesjs-page';
  tpl.innerHTML = `<div class="pagesjs-header"></div>
<div class="pagesjs-body"></div>
<div class="pagesjs-footer"></div>`;
  let box, box_body, H, box_cls = [];
  function newPage(el) {
    el && !$('.pagesjs-body', el) && el.insertAdjacentHTML('afterbegin', tpl.innerHTML);
    box = el || tpl.cloneNode(true); box_body = box.children[1];
    box_cls.length && box.classList.add(...box_cls);
    return box;
  }
  function removeBlank(el) {
    if (!el) return false;
    const v = el.innerText.trim() === '';
    v && el.remove();
    return v;
  }
  function fill(el) {
    // if the element is already a page, just use it as the box
    if (el.classList.contains('pagesjs-page')) {
      box.after(newPage(el));
      // if current element is not empty, fill its content into the box
      if (el.childElementCount > 3) {
        box_body.append(...[...el.children].slice(3));
        // TODO: should we fragment this page if it's too long?
        box.after(newPage());  // create a new empty page
      }
      return;
    }
    // create a new box when too much content (exceeding original height)
    if (box.scrollHeight > H) {
      const [box2, box_body2] = [box, box_body];  // store old box
      box2.after(newPage());
      // if there's more than one child in the box, move the last child to next box
      box_body2.childElementCount > 1 && box_body.append(box_body2.lastElementChild);
    }
    box_body.append(el);
    fragment(el);
  }
  // break elements that are relatively easy to break (such as <ul>)
  function fragment(el, container, parent, page) {
    if (box.scrollHeight <= H) return;
    const box_cur = page || box, el2 = el.cloneNode();  // shallow clone (wrapper only)
    // add the clone to current box, and move original el to next box
    container ? container.append(el2) : (
      box_body.append(el2), box_cur.after(newPage()), box_body.append(el)
    );
    // for DIVs containing a single child (e.g., #TOC > ul), try to break the child
    if (el.tagName === 'DIV' && el.childElementCount === 1) {
      fragment(el.firstElementChild, el2, el, box_cur);
    }
    // keep moving el's first item to el2 until page height > H
    if (['UL', 'BLOCKQUOTE'].indexOf(el.tagName) > -1 && el.childElementCount > 1) while (true) {
      const item = el.firstChild;
      if (!item) break;
      el2.append(item);
      if (box_cur.scrollHeight > H) {
        el.insertBefore(item, el.firstChild);
        break;
      }
    }
    el2.lastChild || el2.remove();  // remove the clone if empty
    fragment(container ? parent : el);
  }

  // use data-short-title of a header if exists, and fall back to inner text
  function shortTitle(h) {
    return h && (h.dataset.shortTitle || h.innerText);
  }
  const main = shortTitle($('h1.title, .frontmatter h1, .title, h1')),  // main title
    ps = (book ? 'h1' : 'h2') + ':not(.frontmatter *)',  // page title selector
    tb = ['top', 'bottom'].map(i => {
      const v = getComputedStyle(d.documentElement).getPropertyValue(`--paper-margin-${i}`);
      return +v.replace('px', '') || 0;
    });  // top/bottom page margin

  // calculate how many new pages we need for overflowed content (this is just
  // an estimate; if not accurate, use <div class="pagesjs-page" data-pages-offset="N">
  // to provide a number manually)
  function calcPages(box) {
    let n = +box.dataset.pagesOffset;
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

    cls.add('pagesjs'); book && cls.add('page-book');
    d.body.insertAdjacentElement('afterbegin', newPage());
    H = box.clientHeight || window.innerHeight;  // use window height if box height not specified

    // remove possible classes on TOC/footnotes that we don't need for printing
    $$(':is(#TOC, .footnotes, .chapter-before, .chapter-after):is(.side-left, .side-right).side').forEach(el => {
      el.classList.remove('side', 'side-left', 'side-right');
    });

    cls.add('pagesjs-filling');
    // iteratively add elements to pages
    $$('.frontmatter, #TOC, .abstract').forEach(el => (fill(el), book && box.after(newPage())));
    $$('.body').forEach(el => {
      // preserve book chapter classes if exist
      box_cls = ['chapter', 'appendix'].filter(i => el.classList.contains(i));
      newPage(box);
      book && box.innerText !== '' && box.after(newPage());
      [...el.children].map(fill);
      // clean up container and self if empty
      removeBlank(el.parentNode); removeBlank(el);
    });
    cls.remove('pagesjs-filling');

    // add dot leaders to TOC
    const toc = $('#TOC');
    $$('a[href^="#"]', toc).forEach(a => {
      const s = d.createElement('span'),  // move TOC item content into a span
        n = a.firstElementChild;  // if first child is section number, exclude it
      n?.classList.contains('section-number') ? n.after(s) : a.insertAdjacentElement('afterbegin', s);
      while (s.nextSibling) s.append(s.nextSibling);
      a.insertAdjacentHTML('beforeend', '<span class="dot-leader"></span>');
      a.dataset.pageNumber = '000';  // placeholder for page numbers
    });

    // add page number, title, etc. to data-* attributes of page elements
    let page_title, i = 0;
    $$('.pagesjs-page').forEach(box => {
      if (removeBlank(box)) return;  // remove empty pages
      book && $(ps, box) && (page_title = '');  // empty title for first page of chapter
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
      let ft;  // first footnote on page
      // move all footnotes after the page body
      $$('.footnotes', box).forEach((el, i) => {
        i === 0 ? (ft = el, box.children[1].after(el)) : (ft.append(...el.children), el.remove());
      });
    });

    // add page numbers to TOC with data-* attributes
    $$('a[href^="#"]', toc).forEach(a => {
      const p = $(`.pagesjs-page:has(${a.getAttribute('href')}) .pagesjs-header`);
      a.dataset.pageNumber = p ? p.dataset.pageNumber : '';
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
