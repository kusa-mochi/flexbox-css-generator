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
        //// To exclude files from clean target, cancel the following comment.
        // '!dist/mobile/deploy.json'
    ], cb);
});



var typescript = require('gulp-typescript');
gulp.task('ts', function () {
    //output options
    var options = {
        out: 'index.js'
    };
    gulp.src([
        './**/*.ts',
        '!./node_modules/**'// except files below node_modules folder
    ]).pipe(typescript(options))
        .pipe(gulp.dest('./output/debug'));
});


var open = require("gulp-open");
gulp.task("test", ["build"], function () {
    gulp.src("./index-debug.html").pipe(open());
});



var insert = require("gulp-insert");
var minify = require("gulp-closurecompiler");
gulp.task("release", ["build"], function () {
    return gulp.
        src(debugDirName + outputFileName).
        pipe(newer(releaseDirName)).
        pipe(insert.wrap("(function() {\nvar NDEBUG=true;\n", "\n})();")).
        pipe(gulp.dest(wrappedDirName)).
        pipe(minify({ fileName: outputFileName })).
        pipe(gulp.dest(releaseDirName));
});



gulp.task('rebuild_debug', function(){
  gulp.start('clean_all');
  gulp.start('ts');
});
