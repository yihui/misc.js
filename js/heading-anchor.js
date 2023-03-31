document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
  if (h.id) h.innerHTML += ` <span class="anchor"><a href="#${h.id}">#</a></span>`;
});
