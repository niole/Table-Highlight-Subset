// tests/testdom.js
module.exports = function(markup) {
  if (typeof document !== 'undefined') return;
  var jsdom = require('jsdom').jsdom;
  global.document = jsdom(markup || '');
  global.window = document.parentWindow;
  global.navigator = {
    userAgent: 'node.js'
  };
};

//at the top of every test include this before react
//require('./testdom')('<html><body></body></html>');
