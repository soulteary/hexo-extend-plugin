const minify = require('html-minifier').minify;
const minimatch = require('minimatch');

module.exports = function (str, data) {
    let options = this.config.html_minifier;
    let path = data.path;
    let exclude = options.exclude;

    if (exclude && !Array.isArray(exclude)) exclude = [exclude];
    if (path && exclude && exclude.length) {
        for (let i = 0, len = exclude.length; i < len; i++) {
            if (minimatch(path, exclude[i])) return str;
        }
    }

    return minify(str, options);
};
