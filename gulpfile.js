"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var path = {
  JADE: 'frontend/index.jade',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'views/',
  DEST_BUILD: 'public/js/',
  DEST_SRC: 'public/src/',
  ENTRY_POINT: './frontend/App.jsx'
};

gulp.task('copy', function(){
  gulp.src(path.JADE)
  .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTMLsrc', function(){
  var sources = gulp.src([path.DEST_SRC + '*.js'], {read: false});

  gulp.src(path.JADE)
  .pipe(inject(sources, { ignorePath: 'public' }))
  .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', ['replaceHTMLsrc'], function() {
  gulp.watch(path.JADE);
  //gulp.watch(path.JADE, ['replaceHTMLsrc']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.DEST_SRC));
});
gulp.task('build', function(){

  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
  .bundle()
  .pipe(source(path.MINIFIED_OUT))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(path.DEST_BUILD));
});
gulp.task('replaceHTML', function(){
  var sources = gulp.src([path.DEST_BUILD + '*.js'], {read: false});

  gulp.src(path.JADE)
  .pipe(inject(sources, { ignorePath: 'public' }))
  .pipe(gulp.dest(path.DEST));
});


gulp.task('default', ['watch']);

gulp.task('production', ['replaceHTML', 'build']);
