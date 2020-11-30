let gulp = require('gulp');

/**
 *  Website
 * 
 */
let website_html = require('./gulp/html.js');
let website_sass = require('./gulp/sass.js');
let website_js = require('./gulp/scripts.js');
let website_images = require('./gulp/images.js');
let website_dev = require('./gulp/dev.js');

// Build tasks
gulp.task('website_sass', gulp.series([website_sass.build, website_sass.clean]));
gulp.task('website_html', gulp.series([website_html.build, website_html.clean]));
gulp.task('website_js', gulp.series([website_js.build, website_js.clean]));
gulp.task('website_img', gulp.series([website_images.copy, website_images.clean]));

// Build website
gulp.task(
  'build_website',
  gulp.series([
    website_html.build,
    website_sass.build,
    website_js.build,
    website_images.copy,
    gulp.parallel([website_sass.clean, website_html.clean, website_js.clean, website_images.clean])
  ])
);

// Watch website
gulp.task('watch_website', function(resolve){
  gulp.watch([`_html/**/*.html`], gulp.parallel(['website_html']));
  gulp.watch([`_images/**/*`], gulp.parallel(['website_img']));
  gulp.watch([`_js/**/*.js`], gulp.parallel(['website_js']));
  gulp.watch([`_scss/**/*.scss`], gulp.series(['website_sass']));

  resolve();
});

// Default gulp task
gulp.task('default', gulp.series(['build_website', gulp.parallel([website_dev.server, 'watch_website'])]));
