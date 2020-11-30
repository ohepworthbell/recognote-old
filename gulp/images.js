let gulp = require('gulp');
let plumber = require('gulp-plumber');
let svgsprite = require('gulp-svg-sprite');
let del = require('del');

// Set URL base
let devUrl = '_images/';
let distUrl = 'dist/img/';

// Remove old distribution files
exports.clean = () => del(`${distUrl}**/*`);

// Copy assets to `dist` directory
exports.copy = resolve => {
  // Copy over standard images
  gulp.src([`${devUrl}**/*`, `!${devUrl}sprites/**/*`]).pipe(plumber()).pipe(gulp.dest(`${distUrl}`));

  // Create SVG sprites
  gulp
    .src([`${devUrl}sprites/**/*.svg`])
    .pipe(plumber())
    .pipe(
      svgsprite({
        mode: {
          symbol: {
            render: {
              css: false,
              scss: false
            },
            dest: '',
            prefix: '.sprite-%s',
            sprite: 'icons.svg',
            example: false
          }
        }
      })
    )
    .pipe(gulp.dest(`dist/img/`));

  resolve();
};
