var gutil = require('gulp-util');
var merge = require('merge');
var through2 = require('through2');
var compilers = require('./compilers');

module.exports = function(options) {
  options = merge({
    modules: 'cjs'
  }, options);

  var compiler = compilers[options.modules];

  return through2.obj(function(file, enc, cb) {
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
      contents: new Buffer(compiler(file))
    }));

    cb();
  });
};
