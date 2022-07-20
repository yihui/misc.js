// navigate to previous/next posts by Left/Right arrows
(function(d) {
  const a1 = d.querySelector('.nav-prev > a'), a2 = d.querySelector('.nav-next > a');
  d.addEventListener('keyup', function(e) {
    if (e.target.nodeName.toUpperCase() != 'BODY') return;
    let u;
    if (a1 && e.which == 37) {  // Left arrow
      u = a1.href;
    } else if (a2 && e.which == 39) {  // Right arrow
      u = a2.href;
    }
    if (u) window.location = u;
  });

  const us = d.querySelectorAll('.unlist');
  if (us.length === 0) return;
  const s = sessionStorage.getItem('hide-notes');
  if (s !== null) return us.forEach(u => u.classList.remove('unlist'));
  if (a1 && a2) {
    window.location = d.referrer === a2.href ? a1.href : a2.href;
  }
})(document);
