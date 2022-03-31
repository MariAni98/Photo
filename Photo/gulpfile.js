const { src, dest, series, watch } = require('gulp')

const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del('dist')
}

const cleanBuild = () => {
  return del('build')
}

const styles = () => {
  return src('src/css/*.css')
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const stylesBuild = () => {
  return src('src/css/*.css')    
  .pipe(concat('main.css'))
  .pipe(autoprefixes({
      cascade: false
   }))
  .pipe(cleanCss({
      level: 2
   }))      
  .pipe(dest('build'))   
}

const htmlMinify = () => {
  return src('src/**/*.html')    
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinifyBuild = () => {
  return src('src/**/*.html')
  .pipe(htmlMin({
      collapseWhitespace: true,
  })) 
  .pipe(dest('build'))  
}

const svgSprites = () => {
  return src('src/**/*.svg')  
  .pipe(svgSprite({
    mode: {
     stack: {
      sprite: '../sprite.svg'
    }
   }
 }))
 .pipe(dest('dist/images'))	
 .pipe(dest('build/images'))
}

const scripts = () => {
  return src([
    'src/js/*.js',
    'src/js/main.js',
  ])
 .pipe(sourcemaps.init())   
 .pipe(sourcemaps.write())
 .pipe(dest('dist')) 
 .pipe(browserSync.stream())
}

const scriptsBuild = () => {
  return src([
   'src/js/*.js',
   'src/js/main.js',
 ])
 .pipe(babel({
     presets: ['@babel/env']
 }))
 .pipe(concat('app.js'))
 .pipe(uglify({
      toplevel: true
 }).on('error', notify.onError()))
 .pipe(dest('build')) 
}

const watchFiles = () => {
  browserSync.init ({
   server: {
    baceDir: 'dist',
    index: 'dist/index.html'
      }
  })
} 

const images = () => {
  return src([
   'src/images/**/*.jpg',
   'src/images/**/*.png',
   'src/images/*.svg',
   'src/images/*.ico',
   'src/images/**/*.jpeg',
   ])
  .pipe(image())
  .pipe(dest('dist/images')) 
  .pipe(dest('build/images'))
}


watch('src/js/*.js', scripts)
watch('src/*.html', htmlMinify)
watch('src/**/*.css', styles)
watch('src/images/*.svg', svgSprites)

exports.clean = clean
exports.styles = styles
exports.htmlMinify = htmlMinify
exports.scripts = scripts
exports.images = images
exports.watchFiles = watchFiles
exports.cleanBuild = cleanBuild
exports.stylesBuild = stylesBuild
exports.scriptsBuild = scriptsBuild
exports.htmlMinifyBuild = htmlMinifyBuild

exports.build = series(cleanBuild, htmlMinifyBuild, scriptsBuild, stylesBuild, images, svgSprites)
exports.default = series(clean, htmlMinify, scripts, styles, images, svgSprites, watchFiles)