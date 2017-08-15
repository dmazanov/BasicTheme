"use strict";
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		rename = require("gulp-rename"),
		browserSync = require("browser-sync").create(),
		reload = browserSync.reload;

gulp.task("sass", function() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
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
