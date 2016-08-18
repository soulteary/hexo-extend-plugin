const path = require('path');
const updater = require('../../../../../lib/update-package');

module.exports = function (args) {
    if (!args.on && !args.off) return this.call('help', {_: 'enable-document'});

    const pkg = path.join(process.env.PWD, 'package.json');

    require('hexo-document-plugin/lib/generate-post-content')(true);

    return updater(path.join(__dirname, 'data.json'), pkg, args.on);
};