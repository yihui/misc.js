// right-align a quote footer if it starts with ---
[...document.getElementsByTagName('blockquote')].forEach(quote => {
  const el = quote.lastElementChild;
  if (el?.tagName === 'P' && /^(—|―|---)/.test(el.textContent)) el.style.textAlign = 'right';
});
