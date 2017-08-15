"use strict";
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		rename = require("gulp-rename"),
		plumber = require("gulp-plumber"),
		gutil = require("gulp-util"),
		browserSync = require("browser-sync").create(),
		reload = browserSync.reload;


var onError = function(err) {
	console.log("An error occurred:", gutil.colors.magenta(err.message));
	gutil.beep();
	this.emit("end");
};

gulp.task("sass", function() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("src/css"));
});

// Static Server + watching scss/php files
gulp.task('browser-sync', function() {
		browserSync.init({
			files: ['./**/*.php'],
			proxy: 'wp-basic-theme.loc/',
		});
	gulp.watch("src/scss/**/*.scss", ["sass"]);
});

gulp.task("default", ["sass"]);
