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
        // // このファイルは削除したくないため、パターンを打ち消し
        // '!dist/mobile/deploy.json'
    ], cb);
});



// var newer = require("gulp-newer");
var typescript = require('gulp-typescript');
gulp.task('rebuild_debug', function () {
    //出力オプション
    var options = {
        out: 'index.js'
    };
    gulp.src([
        './**/*.ts',
        '!./node_modules/**'//node_modules配下は除外する
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
