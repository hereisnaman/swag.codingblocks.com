let gulp = require('gulp');
let using = require('gulp-using');
let changed = require('gulp-changed');
let imagesMin = require('gulp-imagemin');

let config = require('../config').compressImages;

gulp.task('compressImages', function () {
    let imagesMinStream = gulp.src(config.src + config.imgSrc + '/**/*.*')
        .pipe(imagesMin())
        .pipe(using())
        .pipe(gulp.dest(config.dest + config.imgSrc));

    return new Promise((resolve, reject) => {
        imagesMinStream.on('finish', resolve);
        imagesMinStream.on('error', reject);
    })
});
