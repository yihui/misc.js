document.querySelectorAll('h1,h2,h3').forEach(h => {
  if (h.id) h.innerHTML += ` <span class="anchor"><a href="#${h.id}">#</a></span>`;
});
