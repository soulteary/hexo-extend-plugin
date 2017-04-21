'use strict';
const pkgOption = require('hexo-extend-plugin/lib/check-pkg-option');

module.exports = function(ctx) {
  var filter = ctx.extend.filter;

  if (pkgOption('upgrade_excerpt').value) {
    filter.register('after_post_render', require('hexo-extend-plugin/feature/excerpt/index'));
  } else {
    filter.register('after_post_render', require('./excerpt'));
  }

  filter.register('after_post_render', require('./external_link'));
};
