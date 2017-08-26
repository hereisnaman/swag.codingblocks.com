let gulp = require('gulp'),
    using = require('gulp-using'),
    config = require("../config.js").completeMigrate;

gulp.task("dev_complete_migrate", ['dev_minify'], function () {
    let generalStream = gulp.src(config.src)
        .pipe(using())
        .pipe(gulp.dest(config.dest));

    let jsonStream = gulp.src(config.jsonSrc)
        .pipe(using())
        .pipe(gulp.dest(config.dest));

    return Promise.all([
        new Promise((resolve, reject) => {
            generalStream.on('finish', resolve);
            generalStream.on('error', reject);
        }),
        new Promise((resolve, reject) => {
            jsonStream.on('finish', resolve);
            jsonStream.on('error', reject);
        }),
    ]);
});
