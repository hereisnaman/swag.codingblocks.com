let gulp = require('gulp')
let using = require('gulp-using')
let clean = require('gulp-clean')

let config = require('../config').clean

gulp.task('clean', function () {
    return gulp.src(config.src, {read: false}, {force: true})
        .pipe(using())
        .pipe(clean())
})

