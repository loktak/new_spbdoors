const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
const del = require('del');

function sassToCss() {
    return gulp.src('./app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade:false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function cleanStyles() {
  // очистка папки dist/css
  return del('./css/*')
}

function jsOptimizer () {
  // поиск файла script.js
  return gulp.src('./app/js/script.js')
  //конечный файл
  .pipe(gulp.dest('./js'))
  //автообноление
  .pipe(browserSync.stream());
}

function cleanScripts() {
  // очистка папки dist/js
  return del('./js/*')
}

//просмотр файлов
function watch () {
  browserSync.init({
    server: {
        baseDir: "./"
    }
});

//следит за scss
    gulp.watch('./app/sass/**/*.scss', sassToCss)
    gulp.watch('./app/js/**/*.js', jsOptimizer)
    gulp.watch("dist/*.html").on('change', browserSync.reload);
}
gulp.task('sass', sassToCss)
gulp.task('jsMin', jsOptimizer);
gulp.task('clean', gulp.series(cleanScripts, cleanStyles));
gulp.task('watch', watch);
gulp.task('build', gulp.series('clean', gulp.parallel(sassToCss, jsOptimizer)));
gulp.task('run', gulp.series('build', 'watch'))