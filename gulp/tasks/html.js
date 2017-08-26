let gulp = require('gulp'),
    gulpData = require("gulp-data"),
    changed = require('gulp-changed'),
    using = require('gulp-using'),
    hb = require('gulp-hb'),
    ext = require('gulp-ext-replace'),
    minifyHtml = require('gulp-htmlmin'),
    path = require('path'),
    config = require('../config').html;

gulp.task('html', ['clean'], function () {

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
                return require('../../' + config.dataSrc + '/products.json');
            }))
            .pipe(hb({
                partials: config.partialsSrc + '/**/*.hbs',
                helpers: config.helpersSrc + '/**/*.js',
                data: [config.src + '/**/*.json', config.dataSrc + '/**/*.json']
            }))
            .pipe(using())
            .pipe(ext('.html'))
            .pipe(minifyHtml({collapseWhitespace: true}))
            .pipe(gulp.dest(config.dest));

        stream.on('finish', resolve);
        stream.on('error', reject);
    });
});


