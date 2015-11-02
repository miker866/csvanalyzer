var gulp = require('gulp');
var webserver = require('gulp-webserver');
var exec = require('child_process').exec;
 
gulp.task('server', function(ser) {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));

    exec('node server.js', function (err, stdout, stderr) {
	    console.log(stdout);
	    console.log(stderr);
	    ser(err);
  	});
});
