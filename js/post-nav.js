// navigate to previous/next posts by Left/Right arrows, and Alt + <-/-> for back/forward
(d => {
  const a1 = d.querySelector('.nav-prev > a'), a2 = d.querySelector('.nav-next > a');
  d.addEventListener('keyup', function(e) {
    if (e.target.nodeName.toUpperCase() != 'BODY') return;
    let u;
    if (e.key === 'ArrowLeft') {
      e.altKey ? history.back() : (a1 && (u = a1.href));
    } else if (e.key == 'ArrowRight') {
      e.altKey ? history.forward() : (a2 && (u = a2.href));
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
