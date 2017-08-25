let gulp = require('gulp');
let using = require('gulp-using');


let config = require('../config').minify;

gulp.task('dev_minify', ['dev_html'], function () {
    let imgMinStream = gulp.src(config.src + config.imgSrc + '/**/*.*')
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.imgSrc));

    let jsMinStream = gulp.src(config.src + config.jsSrc + '/**/*.*')
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.jsSrc));

    let cssMinStream = gulp.src(config.src + config.cssSrc + '/**/*.*')
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.cssSrc));

    let assetsMinStream = gulp.src([
        config.src + '/' + config.assets + '/**/*.*',
        '!' + config.src + '/' + config.assets + '/**/..*',
        '!' + config.src + '/' + config.imgSrc + '/**/*.*',
        '!' + config.src + '/' + config.jsSrc + '/**/*.*',
        '!' + config.src + '/' + config.cssSrc + '/**/*.*'
    ])
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.assets));

    return Promise.all([
        new Promise((resolve, reject) => {
            imgMinStream.on('finish', resolve);
            imgMinStream.on('error', reject);
        }),
        new Promise((resolve, reject) => {
            jsMinStream.on('finish', resolve);
            jsMinStream.on('error', reject);
        }),
        new Promise((resolve, reject) => {
            cssMinStream.on('finish', resolve);
            cssMinStream.on('error', reject);
        }),
        new Promise((resolve, reject) => {
            assetsMinStream.on('finish', resolve);
            assetsMinStream.on('error', reject);
        })
    ]);
});
