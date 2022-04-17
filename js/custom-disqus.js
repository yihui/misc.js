// lazyload Disqus on my personal site
(function(d) {
  var inIFrame = function() {
    var iframe = true;
    try { iframe = window.self !== window.top; } catch (e) {}
    return iframe;
  };
  if (inIFrame()) return;
  var t = d.getElementById('disqus_thread'), s = t.nextElementSibling,
      a = d.querySelector('section.comments'),
      rads = a.querySelectorAll('input[type="radio"]');
  s.setAttribute('data-timestamp', +new Date());
  var inputValues = function() {
    var v = {};
    rads.forEach(function(el) { v[el.id] = el.checked; });
    return v;
  }, selectTab2 = function() {
    a.querySelector('#tab-2').checked = true;
    return 'add';
  }, showFullComment = function(el) {
    if (el.name !== 'layout') return;
    a.classList[el.id === 'layout-2' ? selectTab2() : 'remove']('comment-full');
  }, inputRestore = function() {
    var v = localStorage.getItem('comment-prefs');
    if (!v) return;
    v = JSON.parse(v);
    rads.forEach(function(el) {
      if (v[el.id]) {
        el.checked = true;
        showFullComment(el);
      }
    });
  }, inputSave = function() {
    showFullComment(this);
    loadScript();
    var v = JSON.stringify(inputValues());
    try { localStorage.setItem('comment-prefs', v); } catch (e) {}
  }, loadScript = function() {
    var full = a.classList.contains('comment-full');
    a.querySelectorAll('input[name="tabs"]').forEach(function(el, i) {
      if (!full && !el.checked) return;
      var p = a.querySelector('.panel:nth-of-type(' + (i + 1) + ') > script[data-src]');
      if (!p || !p.dataset.src) return;
      p.src = p.dataset.src;
      p.removeAttribute('data-src');
    });
  };
  // restore radio button values when opening page
  inputRestore();
  // save when radio button values change
  rads.forEach(function(el) { el.addEventListener('change', inputSave); });
  var b = false, l = function(scroll) {
    if (b) return;
    a.querySelector('.tabs').style.display = '';
    loadScript();
    b = true;
    if (scroll) t.scrollIntoView();
  }
  s.onerror = function(e) {
    // try to load Disqus in the read-only mode
    var s2 = d.createElement('script');
    s2.src = "//cdn.jsdelivr.net/gh/yihui/DisqusJS@1.3.3/src/disqus.min.js";
    t.appendChild(s2);
    try { localStorage.setItem('dsqjs_mode', 'dsqjs'); } catch (e) {}
    s2.onload = function(e) {
      var s3 = d.createElement('link');
      s3.rel = 'stylesheet';
      s3.href = '//cdn.jsdelivr.net/gh/yihui/DisqusJS@1.3.3/src/disqusjs.min.css';
      d.head.appendChild(s3);
      disqus_config.DisqusJSInit();
    };
    s2.onerror = function(e) {
      t.innerText = 'Sorry, but you cannot make comments because Disqus failed to load for some reason. It is known to be blocked in certain regions. If you are sure it is not blocked in your region, please refresh the page. Alternatively, you can comment with Utterances. 您可能需要翻墙发表 Disqus 评论；若没有梯子，不妨尝试使用 Github 登录 Utterances 评论。';
      t.style.border = '1px dashed';
      t.style.padding = '.5em';
      t.style.background = 'lightyellow';
      selectTab2();
    };
  };
  // show comments when the hash means to jump to a comment
  if (location.hash.match(/^#comment-[0-9]+$/)) return l(true);
  var c = function() {
    if (b) return;
    var rect = a.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) l();
  };
  window.addEventListener('load', c);
  d.addEventListener('scroll', c);
})(document);
