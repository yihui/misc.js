(function() {
  var h, hs = document.querySelectorAll('h1,h2,h3');
  for (var i = 0; i < hs.length; i++) {
    h = hs[i];
    if (h.id === '') continue;
    h.innerHTML += ' <span class="anchor"><a href="#' + h.id + '">#</a></span>';
  }
})();
