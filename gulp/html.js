let gulp = require('gulp');
let include = require('gulp-tag-include-html');
let plumber = require('gulp-plumber');
let del = require('del');

// Export functions
// Build HTML distribution files
exports.build = resolve => {
  gulp.src(`_html/index.html`).pipe(plumber()).pipe(include()).pipe(gulp.dest(`dist/`));
  gulp.src(`_html/content/*`).pipe(plumber()).pipe(include()).pipe(gulp.dest(`dist/async/`));

  resolve();
};

// Remove distribution files
exports.clean = () => del([`dist/*.html`, `dist/async/*.html`]);
