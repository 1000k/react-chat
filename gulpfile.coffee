gulp = require 'gulp'
plumber = require 'gulp-plumber'
browserify = require 'browserify'
source = require "vinyl-source-stream"
reactify = require 'reactify'
sass = require 'gulp-sass'
bourbon = require 'node-bourbon'

gulp.task 'browserify', ->
  b = browserify
    entries: ['src/main.js'],
    transform: [reactify]
  return b.bundle()
    .pipe source 'app.js'
    .pipe gulp.dest 'dist'

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
  gulp.watch 'src/*.js', ['browserify']
  gulp.watch 'src/sass/*.sass', ['sass']