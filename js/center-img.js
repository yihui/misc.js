(function() {
  function center_el(tagName) {
    var tags = document.getElementsByTagName(tagName), i, tag;
    for (i = 0; i < tags.length; i++) {
      tag = tags[i];
      var parent = tag.parentElement;
      // center an image if it is the only element of its parent
      if (parent.childElementCount === 1) {
        // if there is a link on image, check grandparent
        var parentA = parent.nodeName === 'A';
        if (parentA) {
          parent = parent.parentElement;
          if (parent.childElementCount != 1) continue;
          parent.firstElementChild.style.border = 'none';
        }
        if (parent.nodeName === 'P') {
          parent.style.textAlign = 'center';
          if (!parentA && tagName === 'img') {
            parent.innerHTML = '<a href="' + tag.src + '" style="border: none;">' +
              tag.outerHTML + '</a>';
          }
        }
      }
    }
  }
  var tagNames = ['img', 'embed', 'object'];
  for (var i = 0; i < tagNames.length; i++) {
    center_el(tagNames[i]);
  }
  // also center paragraphs that contain `* * *`
  var ps = document.getElementsByTagName('p');
  for (var i = 0; i < ps.length; i++) {
    if (ps[i].innerText === '* * *') ps[i].style.textAlign = 'center';
  };
})();
