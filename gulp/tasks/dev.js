let gulp = require('gulp'),
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
    config = require('../config').dev;

gulp.task('dev', ['dev_clean_build'], function () {

    watch(config.src + '/' + config.imgSrc + '/**/*.*')
        .pipe(imgMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.imgSrc));

    watch(config.src + '/' + config.jsSrc + '/**/*.js')
        .pipe(jsMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.jsSrc));

    watch(config.src + '/' + config.cssSrc + '/**/*.css')
        .pipe(cssMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + '/' + config.cssSrc));

    watch([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
        .pipe(gulpData(function (file) {
            try {
                return require(file.path.replace('.hbs', '.json'));
            } catch (e) {
                console.log("No JSON for " + file.path);
                return ({});
            }
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/tShirts.json');
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/bags.json');
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/books.json');
        }))
        .pipe(gulpData(function (file) {
            return require('../../' + config.dataSrc + '/pens.json');
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
            .pipe(gulpData(function (file) {
                try {
                    return require(file.path.replace('.hbs', '.json'));
                } catch (e) {
                    console.log("No JSON for " + file.path);
                    return ({});
                }
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/tShirts.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/bags.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/books.json');
            }))
            .pipe(gulpData(function (file) {
                return require('../../' + config.dataSrc + '/pens.json');
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
        .pipe(server({
            livereload: true,
            directoryListing: false,
            port: 5000,
            open: true
        }));

});
