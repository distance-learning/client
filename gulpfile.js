var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');

gulp.task('scripts', function () {
  return gulp.src(['app/**/*.js', '!app/**/*.min.js'])
      .pipe(plumber())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./build/'))
      .pipe(reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('./app/**/*.html')
      .pipe(reload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src('app/**/*.css')
      .pipe(reload({stream: true}));
});

gulp.task('browserSync', function () {
  browserSync({
    port: 8000,
    server: {
      baseDir: "./build/",
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.html', ['html', 'build:copyApp']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.css', ['css', 'build:copyCss']);
});

gulp.task('build:cleanFolder', function () {
  return del([
    'build/*'
  ]);
});

gulp.task('build:copyApp', function () {
  return gulp.src(['app/**/*.*', '!app/**/*.js'])
      .pipe(gulp.dest('./build/'));
});

gulp.task('build:copyCss', function () {
  return gulp.src('app/**/*.css')
      .pipe(gulp.dest('./build/'))
      .pipe(reload({stream: true}));
});

gulp.task('build', gulpsync.sync(['build:cleanFolder', 'build:copyApp']));
gulp.task('serve', gulpsync.sync(['build:cleanFolder', 'build:copyApp', 'scripts', 'html', 'css', 'browserSync', 'watch']));
