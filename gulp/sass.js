let gulp = require('gulp');
let sass = require('gulp-sass');
let combineMq = require('gulp-combine-mq');
let plumber = require('gulp-plumber');
let autoprefixer = require('gulp-autoprefixer');
let del = require('del');

// Export functions
// Build SASS distribution files
exports.build = resolve => {
  gulp
    .src(`_scss/style.scss`)
    .pipe(plumber(e => showSassErrors(e)))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(combineMq({beautify: false}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`dist/css/`));

  resolve();
};

// Remove distribution files
exports.clean = resolve => {
  del([`dist/css/*.css`]);

  resolve();
};

// Better error notifications
let showSassErrors = e => {
  console.log(`\x1b[41m WARNING \x1b[0m`);
  console.log(` ${e.messageOriginal} (line ${e.line}, column${e.column})`);
  console.log(` \x1b[33m${e.relativePath}\x1b[0m`);
};
