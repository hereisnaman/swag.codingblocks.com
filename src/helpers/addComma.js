module.exports = function (num, options) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
