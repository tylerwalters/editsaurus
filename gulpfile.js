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

gulp.task('stylus', function() {
	var stylus 	= require('gulp-stylus'),
			nib		  = require('nib');

	return gulp.src('public/styles/stylus/main.styl')
		.pipe(stylus({use: [nib()]}))
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('css-min', function() {
	var stylus 		= require('gulp-stylus'),
			nib			  = require('nib'),
			minifycss  = require('gulp-minify-css');

	return gulp.src('public/styles/stylus/main.styl')
		.pipe(stylus({use: [nib()]}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/styles'));
});



gulp.task('default', ['lint', 'stylus']);

console.timeEnd('Loading plugins');