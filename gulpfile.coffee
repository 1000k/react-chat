gulp = require 'gulp'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'
browserify = require 'browserify'
source = require "vinyl-source-stream"
buffer = require "vinyl-buffer"
babelify = require 'babelify'
uglify = require 'gulp-uglify'

gulp.task 'browserify', ->
  browserify
    entries: ['src/app.js']
    transform: [babelify]
    debug: true
  .bundle()
  # Prevent crashing gulp
  .on 'error', (err) ->
    console.log(err.toString())
    this.emit 'end'
  .pipe source 'app.js'
  .pipe buffer()
  .pipe sourcemaps.init {loadMaps: true}
  .pipe uglify()
  .pipe sourcemaps.write()
  .pipe gulp.dest 'dist/'

gulp.task 'sass', ->
  gulp.src 'src/sass/*.sass'
    # Prevent becoming zombie process when build failed
    .pipe plumber(
      errorHandler: (err) ->
        console.log(err.messageFormatted)
        this.emit 'end'
    )
    .pipe sass(
      includePaths: require('node-bourbon').with('dist/css/')
    )
    .pipe gulp.dest 'dist/css/'

gulp.task 'default', ['browserify']

gulp.task 'watch', ->
  gulp.watch 'src/*.js*', ['browserify']
  gulp.watch 'src/sass/*.sass', ['sass']