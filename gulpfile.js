/* jshint node: true */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inlinesource = require('gulp-inline-source');


gulp.task('lint', function () {
  return gulp.src(['src/js/**/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js-min', function () {
  return gulp.src('src/js/script.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
  return gulp.src(['src/worker.js', 'src/serviceworker-cache-polyfill.js', 'src/manifest.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-index', ['sass'], function () {
  return gulp.src('src/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function () {
  return gulp.src(['src/images/**/*.jpg', 'src/images/**/*.gif', 'src/images/**/*.png', 'src/images/**/*.svg'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass', 'copy']);
  gulp.watch('src/js/**/*.js', ['lint', 'js-min']);
  gulp.watch(['src/worker.js', 'src/manifest.json'], ['copy']);
  gulp.watch('src/index.html', ['copy-index']);
});

gulp.task('build', ['lint', 'sass', 'js-min', 'copy', 'copy-index', 'copy-images']);