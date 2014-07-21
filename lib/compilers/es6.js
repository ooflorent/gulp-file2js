module.exports = function(file) {
  var contents = file.contents.toString();
  return 'var contents = ' + JSON.stringify(contents) + ';\nexport default contents;\n'
};
