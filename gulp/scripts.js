let gulp = require('gulp');
let plumber = require('gulp-plumber');
let babel = require('gulp-babel');
let webpack = require('webpack-stream');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let del = require('del');

// Export functions
// Build SASS distribution files
exports.build = resolve => {
  gulp
    .src(`_js/__setup.js`)
    .pipe(plumber())
    .pipe(
      webpack({
        watch: false,
        mode: 'production',
        output: {
          filename: 'script.uncompressednp.js'
        }
      })
    )
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(rename('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`dist/js/`));

  resolve();
};

// Remove distribution files
exports.clean = () => del([`dist/js/*.js`]);
