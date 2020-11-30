let connect = require('gulp-connect');

// Export functions
// Start server w/ live reload
exports.server = resolve => {
  connect.server({
    port: 8000,
    root: `dist/`,
    livereload: true,
    fallback: 'dist/index.html'
  });

  resolve();
};
