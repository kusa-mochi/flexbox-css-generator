// to run tasks, do Ctrl+Shift+B

var outputFileName = "index.js";
var debugDirName = "./output/debug/";
var releaseDirName = "./output/release/";
var wrappedDirName = "./wrapped/";
var binaryDirName = "./bin/";
var gulp = require('gulp');



var del = require("del");
gulp.task('clean_all', function (cb) {
	del([
		'./output/**/*'
	], cb);
});
gulp.task('clean_debug', function (cb) {
	del([
		'./output/debug/**/*'
	], cb);
});
gulp.task('clean_release', function (cb) {
	del([
		'./output/release/**/*'
	], cb);
});



var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');  // error handling
gulp.task('sass', function () {
	gulp.src([
		'./src/**/*.scss',
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./output/debug/css'));
});



var typescript = require('gulp-typescript');
gulp.task('ts', function () {
	gulp.src([
		'./src/ts/**/*.ts',
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(typescript())
		.pipe(gulp.dest('./output/debug/js'));
});


var open = require("gulp-open");
gulp.task("test", ["rebuild_debug"], function () {
	gulp.src("./index-debug.html").pipe(open());
});



var insert = require("gulp-insert");
var minify = require("gulp-closurecompiler");
gulp.task("release", ["rebuild_debug"], function () {
	return gulp.
		src(debugDirName + outputFileName).
		pipe(newer(releaseDirName)).
		pipe(insert.wrap("(function() {\nvar NDEBUG=true;\n", "\n})();")).
		pipe(gulp.dest(wrappedDirName)).
		pipe(minify({ fileName: outputFileName })).
		pipe(gulp.dest(releaseDirName));
});



gulp.task('rebuild_debug', function () {
	gulp.start('clean_debug');
	gulp.start('sass');
	gulp.start('ts');
});
