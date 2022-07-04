(function(d) {
  if (!d.body.classList.contains('has-notes')) return;
  const h = d.querySelector('.title > hr');
  if (!h) return;
  let s = sessionStorage.getItem('hide-notes');
  h.classList.add('toggle-notes');
  h.onclick = function(e) {
    s === null && !/^(localhost|[0-9.]+)$/.test(location.hostname) &&
      alert('你好像发现了个什么不得了的机关……请勿公开，自行享用即可，谢谢！');
    s = d.body.classList.toggle('hide-notes');
    try { sessionStorage.setItem('hide-notes', s); } catch (e) {};
  };
  if (s !== null) d.body.classList.toggle('hide-notes', s === 'true');
})(document);
