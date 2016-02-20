gulp = require 'gulp'
plumber = require 'gulp-plumber'
browserify = require 'browserify'
source = require "vinyl-source-stream"
buffer = require "vinyl-buffer"
babelify = require 'babelify'
uglify = require 'gulp-uglify'
sass = require 'gulp-sass'
bourbon = require 'node-bourbon'

gulp.task 'browserify', ->
  browserify
    entries: ['src/app.js']
    transform: [babelify]
  .bundle()
  # Prevent crashing gulp
  .on 'error', (err) ->
    console.log(err.toString())
    this.emit 'end'
  .pipe source 'app.js'
  .pipe buffer()
  .pipe uglify()
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


gulp.task 'watch', ->
  gulp.watch 'src/*.js*', ['browserify']
  gulp.watch 'src/sass/*.sass', ['sass']