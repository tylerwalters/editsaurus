/*jshint node: true */
"use strict";

console.time('Loading plugins');

var gulp = require('gulp');

gulp.task('lint', function() {
	var jshint = require('gulp-jshint');

	return gulp.src(['api/**/*.js', 'public/js/**/*.js', '*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
	var sass 	= require('gulp-sass');

	return gulp.src('app/styles/sass/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/styles'));
});

gulp.task('css-min', function() {
	var sass 		= require('gulp-sass'),
			minifycss  = require('gulp-minify-css');

	return gulp.src('app/styles/sass/main.styl')
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest('./app/styles'));
});

gulp.task('default', ['lint', 'sass']);

console.timeEnd('Loading plugins');