"use strict";
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		rename = require("gulp-rename"),
		plumber = require("gulp-plumber"),
		gutil = require("gulp-util"),
		browserSync = require("browser-sync").create(),
		reload = browserSync.reload,
		concat = require("gulp-concat"),
		jshint = require("gulp-jshint"),
		uglify = require("gulp-uglify"),
		imagemin = require("gulp-imagemin");


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
	gulp.watch("src/js/*.js").on("change", reload);
});

gulp.task("default", ["sass", "browser-sync"]);



// ====================================================
// ====================================================
// ================= Build DIST ======================



gulp.task("images", function() {
	return gulp.src("src/img/**/*")
	.pipe(plumber({errorHandler: onError}))
	.pipe(imagemin({optimizationLevel: 7, progressive: true}))
	.pipe(gulp.dest("dist/img"))
})