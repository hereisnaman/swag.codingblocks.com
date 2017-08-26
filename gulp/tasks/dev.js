const gulp = require('gulp'),
    server = require('gulp-webserver'),
    using = require('gulp-using'),
    watch = require('gulp-watch'),
    imgMin = require('gulp-imagemin'),
    jsMin = require('gulp-uglify'),
    cssMin = require('gulp-clean-css'),
    ext = require('gulp-ext-replace'),
    path = require('path'),
    gulpData = require("gulp-data"),
    hb = require('gulp-hb'),
    config = require('../config').dev,
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('dev', ['dev_complete_migrate'], function () {

    watch(config.src + '/' + config.imgSrc + '/**/*.*')
        .pipe(plumber())
        .pipe(imgMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.imgSrc));

    watch(config.src + '/' + config.jsSrc + '/**/*.js')
        .pipe(plumber())
        .pipe(jsMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.jsSrc));

    watch(config.src + '/' + config.cssSrc + '/**/*.css')
        .pipe(plumber())
        .pipe(cssMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.cssSrc));

    watch([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
        .pipe(plumber())
        .pipe(gulpData(function (file) {
            try {
                return require(file.path.replace('.hbs', '.json'));
            } catch (e) {
                console.log("No JSON for " + file.path);
                return ({});
            }
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/products.json');
        }))
        .pipe(hb({
            partials: config.partialsSrc + '/**/*.hbs',
            helpers: config.helpersSrc + '/**/*.js',
            data: [config.src + '/**/*.json', config.dataSrc + '/**/*.json']
        }))
        .pipe(using())
        .pipe(ext('.html'))
        .pipe(gulp.dest(config.dest));

    watch([config.partialsSrc + '/**/*.hbs'], function () {
        gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
            .pipe(plumber())
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path);
                    return ({});
                }
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/products.json');
            }))
            .pipe(hb({
                partials: config.partialsSrc + '/**/*.hbs',
                helpers: config.helpersSrc + '/**/*.js',
                data: [config.src + '/**/*.json', config.dataSrc + '/**/*.json']
            }))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(gulp.dest(config.dest));
    });

    return gulp.src(config.dest + '/')
        .pipe(plumber())
        .pipe(server({
            livereload: true,
            directoryListing: false,
            port: 5000,
            open: true
        }));
    
});
