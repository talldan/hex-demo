// Tasks
// ------
// TODO - make gulp watch only rebuild changed items
// TODO - ensure gulp watch doesn't exit when an error occurs
// TODO - build with specific development or production options (e.g. uglify and compress javascripts, css, images in production)

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less-sourcemap');
var path = require('path');
var chmod = require('gulp-chmod');

gulp.task('default', ['build']);
gulp.task('build', ['images', 'fonts', 'js', 'html', 'css']);

// clean the dist directory
gulp.task('clean', function(cb) {
	del(['./dist/**/*'], cb);
});

// copy over html files
gulp.task('html', ['clean'], function() {
	return gulp.src('./src/html/index.html')
		.pipe(gulp.dest('./dist/'));
});

// use browserify to package js, transform react jsx files, and bundle all together
gulp.task('js', ['clean'], function() {
	var b =  browserify({ debug:true });
	var stream = b
		.add('./src/js/index.js')
		.transform({}, reactify)
		.bundle();
	return stream
		.pipe(source('app.js'))
		.pipe(gulp.dest('./dist/js'));
});

// compile css using less processor
gulp.task('css', ['clean'], function() {
	gulp.src('./src/less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('images', ['clean'], function() {
	gulp.src(['./src/assets/images/**/*.png', './src/assets/images/**/*.jpg'])
		.pipe(chmod(644))
		.pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('fonts', ['clean'], function() {
	gulp.src(['./src/less/fonts/**/*', '!./src/less/fonts/**/*.txt'])
		.pipe(chmod(644))
		.pipe(gulp.dest('./dist/css/fonts'));
});

// watch
gulp.task('watch', function() {
	gulp.watch('./src/js/**', ['build']);
	gulp.watch('./src/html/**', ['build']);
	gulp.watch('./src/less/**/*.less', ['build']);
	gulp.watch('./src/less/fonts/**', ['fonts']);
	gulp.watch('./src/assets/images/**', ['images']);
});