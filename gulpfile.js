/* jshint node: true */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


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
  return gulp.src(['src/index.html', 'src/worker.js', 'src/serviceworker-cache-polyfill.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['lint', 'js-min']);
  gulp.watch(['src/index.html', 'src/worker.js'], ['copy']);
});

gulp.task('build', ['lint', 'sass', 'js-min', 'copy']);