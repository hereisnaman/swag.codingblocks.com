let gulp = require('gulp'),
    using = require('gulp-using'),
    clean = require('gulp-clean'),
    config = require('../config').clean;

gulp.task('clean', function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(using())
        .pipe(clean());
});

