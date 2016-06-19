var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var RevAll = require('gulp-rev-all');
var del = require('del');


gulp.task('default', ['css', 'browser-sync', 'watch']);

gulp.task("css",  function() {
  return gulp.src('./app/less/app.less')
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
      baseDir: "./public"
    }
  });
});


gulp.task('watch', function () {
  return gulp.watch(['./app/less/**/*.less'], ['css']);
});

gulp.task('clean', function() {
    return del(['./build'])
});

gulp.task('copyFiles', ['clean', 'css'], function() {
  var revAll = new RevAll({
    dontRenameFile: [/.*\.html$/g, /.*\.map$/g]
  });

  return gulp.src("./public/**")
    .pipe(revAll.revision())
    .pipe(gulp.dest("./build"));
});

gulp.task('build', ['copyFiles']);

