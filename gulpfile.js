"use strict";
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		minify = require("gulp-csso"),
		rename = require("gulp-rename"),
		plumber = require("gulp-plumber"),
		gutil = require("gulp-util"),
		browserSync = require("browser-sync").create(),
		reload = browserSync.reload,
		concat = require("gulp-concat"),
		jshint = require("gulp-jshint"),
		uglify = require("gulp-uglify"),
		imagemin = require("gulp-imagemin"),
		sourcemaps = require("gulp-sourcemaps");


var onError = function(err) {
	console.log("An error occurred:", gutil.colors.magenta(err.message));
	gutil.beep();
	this.emit("end");
};

// Compile sass into CSS, Autoprefixes it & minification
gulp.task("sass", function() {
	return gulp.src("./src/scss/**/*.scss")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("./dist/css"))
		.pipe(minify())
		.pipe(rename("main.min.css"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./dist/css"))
		.pipe(browserSync.stream());
});

// JavaScript optimization & minification
gulp.task("vendors-js", function() {
	return gulp.src([
		"./src/bower_components/jquery/dist/jquery.min.js"
		])
		.pipe(concat("vendors.js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"))
});


gulp.task("js", function() {
	return gulp.src(["./src/js/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("default"))
		.pipe(concat("main.js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"))
});


// Automating Image Optimization
gulp.task("images", function() {
	return gulp.src("./src/img/**/*.{png,jpg,jpeg,gif,svg}")
	.pipe(plumber({errorHandler: onError}))
	.pipe(imagemin({
		optimizationLevel: 3, // 0-7 low-high
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest("./dist/img"))
})


// Move the fonts
gulp.task("fonts", function() {
	gulp.src("./src/fonts/*.{woff,woff2}")
		.pipe(gulp.dest("./dist/fonts"))
});


// Static Server + watching php/scss/js/img files
gulp.task('browser-sync', function() {
		browserSync.init({
			files: ['./**/*.php'],
			proxy: 'wp-basic-theme.loc/',
		});
	gulp.watch("./src/scss/**/*.scss", ["sass", reload]);
	gulp.watch("./src/js/**/*.js", ["js", reload]);
	gulp.watch("./src/fonts/**/*", ["fonts", reload])
	gulp.watch("./src/img/**/*", ["images", reload]);
});

gulp.task("default", ["sass", "vendors-js" , "js", "images", "fonts", "browser-sync"]);