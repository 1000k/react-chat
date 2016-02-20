gulp = require 'gulp'
browserify = require 'browserify'
source = require "vinyl-source-stream"
reactify = require 'reactify'
compass = require 'gulp-compass'

gulp.task 'browserify', ->
  b = browserify
    entries: ['src/main.js'],
    transform: [reactify]
  return b.bundle()
    .pipe source 'app.js'
    .pipe gulp.dest 'dist'

# Please make sure to add css and sass options with the same value
# in config.rb since compass can't output css result directly.
gulp.task 'compass', ->
  gulp.src 'src/sass/*.sass'
    # another options: https://www.npmjs.com/package/gulp-compass
    .pipe compass(
      config_file: 'config.rb'
      css: 'dist/css/'
      sass: 'src/sass/'
    )
    .pipe gulp.dest 'dist/css/'

gulp.task 'watch', ->
  gulp.watch 'src/*.js', ['browserify']
  gulp.watch 'src/sass/*.sass', ['compass']