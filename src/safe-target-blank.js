(function(){
  'use strict';

  // define a click handler
  var goBlank = function(e) {
    // make sure we do not follow the link
    e.preventDefault();
    // create an iframe,
    var iframe = document.createElement('iframe');
    // hide it from the user,
    iframe.style.display = 'none';
    // add it to the DOM.
    document.body.appendChild(iframe);

    // prepare the new body,
    var html = '<body><scr'+'ipt>window.open("' + (e.target.getAttribute('href')) + '");</scr'+'ipt></body>';
    // open the document for writing,
    iframe.contentWindow.document.open();
    // write the body,
    iframe.contentWindow.document.write(html);
    // and close the connection.
    iframe.contentWindow.document.close();
    // the link has been opened - so we assume, because there is no way to be sure.
    // remove the iframe from the DOM to prevent any abuse
    iframe.parentNode.removeChild(iframe);
  };

  // append code to window.onload
  var onload=window.onload;
  window.onload=function(){
    // execute the old unload, if it exists
    if ('function' === typeof onload) {
      onload();
    }

    // gather al anchor elements
    var a = document.getElementsByTagName('a');
    // loop through them...
    for (var i in a) {
      // and if it is an anchor (integer key) and it has a terget=_blank attribute...
      if (parseInt(i, 10) >= 0 && a[i].getAttribute('target') === '_blank') {
        // then bind the click handler,
        a[i].onclick=goBlank;
        // remove the target,
        a[i].removeAttribute('target');
        // and set a comment so there is no doubt about what happened.
        a[i].setAttribute('data-target', 'target=_blank is insecure. This link is now protected against abuse and will still open in a new tab.');
      }
    }
  };
})();
