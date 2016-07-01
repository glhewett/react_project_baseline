var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var RevAll = require('gulp-rev-all');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

gulp.task("css",  function() {
  return gulp.src('./app/less/*.less')
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "public",
      directory: true
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/less/**/*.less'], ['css']);
  gulp.watch(['./public/**/*.html'], browserSync.reload);
});

gulp.task('clean', function() {
  return del(['./build'])
});

gulp.task('revAllFiles', ['clean', 'css'], function() {
  var revAll = new RevAll({
    dontRenameFile: [/.*\.html$/g]
  });

  return gulp.src("./public/**")
    .pipe(revAll.revision())
    .pipe(gulp.dest("./build"));
});

gulp.task('build', ['revAllFiles'], function() {
  return gulp.src("./build/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./build"));
});

gulp.task('default', ['css', 'browser-sync', 'watch']);

