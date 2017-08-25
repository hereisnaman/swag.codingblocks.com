let gulp = require('gulp'),
    gulpData = require("gulp-data"),
    using = require('gulp-using'),
    hb = require('gulp-hb'),
    ext = require('gulp-ext-replace'),
    path = require('path'),
    config = require('../config').html;

gulp.task('dev_html', ['envSetup'], function () {

    return new Promise((resolve, reject) => {
        let stream = gulp.src([config.src + '/**/*.hbs', "!" + config.partialsSrc + '/**/*.hbs'])
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

        stream.on('finish', resolve);
        stream.on('error', reject);
    })
});

