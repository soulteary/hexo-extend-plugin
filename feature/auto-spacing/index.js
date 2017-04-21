// https://github.com/vinta/pangu.js v3.2.1
const pangunode = require('./pangu/core');

module.exports = function (data) {
    let config = this.config.auto_spacing;

    if (config.title) {
        const originTitle = data.title;
        const spacingTitle = pangunode.spacing(data.title);
        if (originTitle.length !== spacingTitle.length) {
            console.log('auto spacing for:', data.title);
            data.title = spacingTitle;
        }
    }
    if (config.content) {
        data.content = pangunode.spacing(data.content);
    }
};
