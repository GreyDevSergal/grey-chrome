// revert.js
// Will Hodge
// Removes the greyscale filters

var body = document.body;
body.style['filter'] = 'none'; // IE
body.style['filter'] = 'none'; // Firefox
body.style['-webkit-filter'] = 'none'; // Safari / Chrome
