const dest = "dist";
const src = 'src';
const assets = 'assets';
const imgSrc = 'assets/img';
const jsSrc = 'assets/js';
const cssSrc = 'assets/css';
const partialsSrc = 'partials';
const helpersSrc = 'helpers';
const dataSrc = 'data';

module.exports = {
    compressImages: {
        src: src,
        dest: src,
        imgSrc: '/' + imgSrc,
    },
    clean: {
        src: [
            dest
        ]
    },
    html: {
        src: src,
        dest: dest,
        partialsSrc: src + '/' + partialsSrc,
        helpersSrc: src + '/' + helpersSrc,
        dataSrc: src + '/' + dataSrc
    },
    minify: {
        src: src,
        dest: dest,
        assets: assets,
        imgSrc: '/' + imgSrc,
        jsSrc: '/' + jsSrc,
        cssSrc: '/' + cssSrc
    },
    completeMigrate: {
        src: [
            src + "/**/*.*",
            "!" + src + "/**/*.{hbs,json}",
            "!" + src + '/' + partialsSrc + "/**/*.*",
            "!" + src + '/' + helpersSrc + "/**/*.*",
            "!" + src + '/' + dataSrc + "/**/*.*"
        ],
        jsonSrc: [],
        dest: dest
    },
    dev: {
        src: src,
        dest: dest,
        assets: assets,
        cssSrc: cssSrc,
        imgSrc: imgSrc,
        jsSrc: jsSrc,
        jsonSrc: src,
        hbsSrc: src,
        partialsSrc: src + '/' + partialsSrc,
        helpersSrc: src + '/' + helpersSrc,
        dataSrc: src + '/' + dataSrc
    }
}
;
