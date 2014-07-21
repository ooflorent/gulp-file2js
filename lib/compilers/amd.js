var path = require('path');

module.exports = function(file) {
  var module = path.basename(file.relative);
  var contents = file.contents.toString();
  return 'define(' + JSON.stringify(module) + ', [], function() { return ' + JSON.stringify(contents) +'; };\n';
};
