var gutil = require('gulp-util');
var merge = require('merge');
var path = require('path');
var through2 = require('through2');

var modules = {};

modules['amd'] = function(file) {
  var module = path.basename(file.relative);
  var contents = file.contents.toString();
  return 'define(' + JSON.stringify(module) + ', [], function() { return ' + JSON.stringify(contents) +'; };\n';
};

modules['cjs'] = function(file) {
  var contents = file.contents.toString();
  return 'module.exports = ' + JSON.stringify(contents) + ';\n';
};

modules['es6'] = function(file) {
  var contents = file.contents.toString();
  return 'var contents = ' + JSON.stringify(contents) + ';\nexport default contents;\n'
};

module.exports = function(options) {
  options = merge({
    modules: 'cjs'
  }, options);

  var transform = modules[options.modules];

  return through2.obj(function(file, enc, cb) {
    console.log(file);
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-file2js', 'Streaming not supported'));
      return cb();
    }

    this.push(new gutil.File({
      cwd: file.cwd,
      base: file.base,
      path: file.path + '.js',
      contents: new Buffer(transform(file))
    }));

    cb();
  });
};
