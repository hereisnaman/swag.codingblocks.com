let gulp = require('gulp'),
    using = require('gulp-using'),
    clean = require('gulp-clean'),
    config = require('../config').cleanBuild;

gulp.task('dev_clean_build', ['dev_complete_migrate'], function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(using())
        .pipe(clean());
});
