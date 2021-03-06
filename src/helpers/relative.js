let path = require('path')
module.exports = function (srcPath, filePath, options) {
    if (/^http/.test(srcPath))
        return srcPath;
    filePath = filePath.split('src')[1];
    return path.relative(filePath + '/..', srcPath);
}
