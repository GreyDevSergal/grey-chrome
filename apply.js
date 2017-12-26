// apply.js
// Will Hodge
// Edits the filter style to greyscale for all browsers

var body = document.body;
body.style['filter'] = 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)'; // IE
if (!body.style['filter']) {
  body.style['filter'] = 'grayscale(1)'; // Firefox
  body.style['-webkit-filter'] = 'grayscale(1)'; // Safari / Chrome
}
