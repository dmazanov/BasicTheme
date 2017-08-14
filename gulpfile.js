"use strict";
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		rename = require("gulp-rename");

gulp.task("sass", function() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest("src/css"));
});

gulp.task("default", ["sass"]);
