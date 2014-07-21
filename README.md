# gulp-file2js

> Convert files to JavaScript

## Install

```sh
$ npm install --save-dev gulp-file2js
```

## Usage

```js
var gulp = require('gulp');
var file2js = require('gulp-file2js');

gulp.task('default', function () {
  return gulp.src('file.html')
    .pipe(file2js())
    .pipe(gulp.dest('dist'));
});
```

## API

### file2js(options)

#### options.modules

Type: `string`
Default: `cjs`

Module type.

* `cjs`: CommonJS module
* `amd`: AMD module
* `es6`: ES6 module

## License

[MIT](LICENSE) © Florent Cailhol
