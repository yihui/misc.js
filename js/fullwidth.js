// look for overflowed <pre> and <table>, and assign .fullwidth class to them
document.querySelectorAll('pre,table').forEach(node => {
  function fullwidth(el) {
    el.classList.add('fullwidth');
  }
  switch (node.tagName) {
    case 'PRE':
      const el = node.firstElementChild;
      el?.tagName === 'CODE' && el.scrollWidth > el.offsetWidth && fullwidth(el);
      break;
    case 'TABLE':
      const p = node.parentElement;
      p && p.offsetWidth < node.offsetWidth && fullwidth(node);
      break;
    default:
  }
});
