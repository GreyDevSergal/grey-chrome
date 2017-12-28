// revert.js
// Will Hodge
// Removes the greyscale filters

var body = document.body;
body.style['filter'] = 'none'; // IE + Firefox
body.style['-webkit-filter'] = 'none'; // Safari + Chrome
