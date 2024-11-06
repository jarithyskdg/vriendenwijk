const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

function styles() {
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/resources/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/resources/js'));
}

function images() {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/resources/img'));

}

function watchAll() {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });

    gulp.watch('./src/**/*.scss', styles);
    gulp.watch('./theme/**/*.scss', styles);
    gulp.watch('./src/**/*.js', scripts);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watchAll;

exports.dev = gulp.series(styles, scripts, images, watchAll);
exports.build = gulp.series(styles, scripts, images);

exports.default = gulp.series(styles, scripts, images, watchAll);