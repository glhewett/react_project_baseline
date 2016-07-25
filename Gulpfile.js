var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var RevAll = require('gulp-rev-all');
var del = require('del');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var jest = require('jest-cli');
var eslint = require('gulp-eslint');

gulp.task('clean', function() {
  return del(['./build'])
});

gulp.task('lint:javascript', function() {
  return gulp.src(['./app/js/**/*.+(js|jsx)', './__tests__/**/*.+(js|jsx)', 'Gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("bundle:javascript", ['lint:javascript'], function() {

  return browserify({
    entries: './app/js/index.jsx',
    extensions: ['.js', '.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
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

gulp.task('watch', ['bundle:javascript', 'bundle:css'], function() {
  gulp.watch(['./app/less/**/*.less'], ['bundle:css']);
  gulp.watch(['./app/js/**/*.+(js|jsx)'], ['bundle:javascript']);
});

gulp.task('serve', ['watch'], function () {

  browserSync.init({
    open: false,
    files: [
      'public/js/*.js',
      'public/css/*.css',
      'public/images/**/*',
      'public/index.html'
    ],
    injectChanges: true,
    server: {
      baseDir: "public"
    }
  });
});

gulp.task('jest', ['lint:javascript'], function(done) {
  jest.runCLI({}, __dirname, function() {
    done();
  })
});

gulp.task('build', ['clean', 'bundle:css', 'bundle:javascript'], function() {
  var revAll = new RevAll({
    dontRenameFile: [/.*\.html$/g]
  });
  return gulp.src("./public/**")
    .pipe(revAll.revision())
    .pipe(gulp.dest("./build"));
});

gulp.task('default', ['serve']);
