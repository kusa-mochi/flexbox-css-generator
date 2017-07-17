// to run tasks, do Ctrl+Shift+B

var sourceDirName = "./src";
var outputFileName = "index.js";
var outputDirName = "./output";
var debugDirName = "./output/debug";
var releaseDirName = "./output/release";
var wrappedDirName = "./wrapped/";
var binaryDirName = "./bin/";
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');  // error handling
var runSequence = require('run-sequence');



var del = require("del");
gulp.task('clean_all', function () {
	return del([
		path.join(outputDirName, '**/*')
	]);
});
gulp.task('clean_debug', function () {
	return del([
		path.join(debugDirName, '**/*')
	]);
});
gulp.task('clean_release', function () {
	return del([
		path.join(releaseDirName, '**/*')
	]);
});



gulp.task('copy_debug', function () {
	// copy library js files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/js/**/*.js')
	]).pipe(gulp.dest(path.join(debugDirName, 'js')));

	// copy library css files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/css/**/*.css')
	]).pipe(gulp.dest(path.join(debugDirName, 'css')));
});



gulp.task('copy_release', function () {
	// copy library js files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/js/**/*.js')
	]).pipe(gulp.dest(path.join(releaseDirName, 'js')));

	// copy library css files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/css/**/*.css')
	]).pipe(gulp.dest(path.join(releaseDirName, 'css')));
});



var pug = require('gulp-pug');
gulp.task('pug', function () {
	var option = { pretty: true }
	gulp.src([
		path.join(sourceDirName, './views/**/*.pug'),
		'!./node_modules/**',
		'!**/_*.pug'
	]).pipe(plumber())
		.pipe(pug(option))
		.pipe(gulp.dest(debugDirName));
});



var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function() {
	return gulp.src(path.join(debugDirName, '**/*.html'))
		.pipe(minifyHTML({ empty: true }))
		.pipe(gulp.dest(releaseDirName));
});



var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', function () {
	return gulp.src([
		path.join(sourceDirName, './views/**/*.scss'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.join(debugDirName, 'css')));
});



var minifyCSS = require('gulp-clean-css');
gulp.task('minify-css', function(){
	return gulp.src([
		path.join(debugDirName, '**/*.css'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(minifyCSS())
		.pipe(gulp.dest(releaseDirName));
});



var tslint = require('gulp-tslint');
gulp.task('tslint', function () {
	return gulp.src([
		path.join(sourceDirName, 'ts/**/*.ts'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(tslint())
		.pipe(tslint.report());
});



var typescript = require('gulp-typescript');
gulp.task('ts', function () {
	return gulp.src([
		path.join(sourceDirName, 'ts/**/*.ts'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(typescript())
		.pipe(gulp.dest(path.join(debugDirName, 'js')));
});



uglify = require('gulp-uglify');
gulp.task('minify-js', function () {
	return gulp.src([
		path.join(debugDirName, '**/*.js'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(uglify())
		.pipe(gulp.dest(releaseDirName));
});



var open = require('gulp-open');
gulp.task('test', function () {
	return gulp.src(path.join(debugDirName, 'test_code.html'))
		.pipe(open());
});



gulp.task('rebuild_debug', function () {
	runSequence(
		'clean_debug',
		['tslint'],
		['copy_debug', 'pug', 'sass', 'ts']
	);
});



gulp.task('rebuild_release', function () {
	runSequence(
		'clean_release',
		['copy_release', 'minify-html', 'minify-css', 'minify-js']
	);
});
