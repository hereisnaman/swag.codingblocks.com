const dest = "dist";
const src = 'src';
const tmp = '.tmp';
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
            tmp,
            dest
        ]
    },
    envSetup: {
        src: [
            src + '/**/*.*',
            '!' + src + '/**/..*',
            '!' + src + '/' + assets + '/**/*.*'
        ],
        dest: tmp
    },
    html: {
        src: tmp,
        dest: dest,
        partialsSrc: tmp + '/' + partialsSrc,
        helpersSrc: tmp + '/' + helpersSrc,
        dataSrc: tmp + '/' + dataSrc
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
            tmp + "/**/*.*",
            "!" + tmp + "/**/*.{hbs,json}",
            "!" + tmp + '/' + partialsSrc + "/**/*.*",
            "!" + tmp + '/' + helpersSrc + "/**/*.*",
            "!" + tmp + '/' + dataSrc + "/**/*.*"
        ],
        jsonSrc: [
            tmp + '/manifest.json'
        ],
        dest: dest
    },
    cleanBuild: {
        src: [
            tmp
        ]
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
