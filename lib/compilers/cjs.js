module.exports = function(file) {
  var contents = file.contents.toString();
  return 'module.exports = ' + JSON.stringify(contents) + ';\n';
};
