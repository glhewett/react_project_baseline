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
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var env = require('gulp-env');

gulp.task("bundle:javascript", function() {

  return browserify({
    entries: './app/js/index.jsx',
    extensions: ['.js', '.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'))
});

gulp.task("bundle:css",  function() {
  return gulp.src('./app/less/*.less')
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./public/css'));
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
  gulp.watch(['./app/less/**/*.less'], ['bundle:css', browserSync.stream]);
  gulp.watch(['./app/js/**/*.js[x]'], ['bundle:javascript', browserSync.reload]);
  gulp.watch(['./public/**/*.html'], browserSync.reload);
});

gulp.task('clean', function() {
  return del(['./build'])
});

gulp.task('revAllFiles', ['clean', 'bundle:css', 'bundle:javascript'], function() {
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

gulp.task('default', ['bundle:css', 'bundle:javascript', 'browser-sync', 'watch']);

