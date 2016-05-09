var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify');

gulp.task('scripts', function(){
  return gulp.src('src/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
  gulp.watch("src/*.js", ['scripts']);
});

gulp.task('default', ['scripts'], function(){
  console.log("Without parameteres, only compiled once. Use gulp watch for compile-on-save.");
});