'use strict';

const path = require('path');
const updater = require('hexo-extend-plugin/lib/update-package');
const pkg = path.join(process.env.PWD, 'package.json');

module.exports = function(args) {
  if (!args.on && !args.off) {
    return this.call('help', {_: 'extend-features'});
  }

  require('hexo-extend-plugin/lib/generate-post-content')(true);

  return updater(path.join(__dirname, 'data.json'), pkg, args.on);
};
