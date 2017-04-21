/* global hexo */

const pkgOption = require('hexo-extend-plugin/lib/check-pkg-option');

module.exports = function(hexo) {


  if (pkgOption('alias', 'hexoPlugin').value) {
    hexo.extend.generator.register('alias', require('./alias'));
  }

  if (pkgOption('feed', 'hexoPlugin').value) {
    hexo.config.feed = Object.assign({
      type: 'atom',
      limit: 20,
      hub: '',
      content: true,
      path: 'atom.xml'
    }, hexo.config.feed);
    hexo.extend.generator.register('feed', require('./feed'));
  }

  if (pkgOption('sitemap', 'hexoPlugin').value) {
    hexo.config.sitemap = assign({path: 'sitemap.xml'}, hexo.config.sitemap);
    hexo.extend.generator.register('sitemap', require('./sitemap'));
  }

  if (pkgOption('wordCount', 'hexoPlugin').value) {
    hexo.extend.helper.register('min2read', require('./word-count').minToRead);
    hexo.extend.helper.register('wordcount', require('./word-count').wordCount);
    hexo.extend.helper.register('totalcount', require('./word-count').totalCount);
  }

  if (pkgOption('autoNoFollow', 'hexoPlugin').value) {
    hexo.config.nofollow = Object.assign({exclude: []}, hexo.config.nofollow);
    hexo.extend.filter.register('after_render:html', require('./auto-nofollow'));
  }

  if (pkgOption('autoSpacing', 'hexoPlugin').value) {
    hexo.config.auto_spacing = Object.assign({
      title: false,
      content: false
    }, hexo.config.auto_spacing);
    hexo.extend.filter.register('after_post_render', require('./auto-spacing'));
  }

  if (pkgOption('toc', 'hexoPlugin').value) {
    const toc = require('./lib/filter');
    hexo.config.toc = Object.assign({maxdepth: 3}, hexo.config.toc);
    hexo.extend.filter.register('before_post_render', toc.insert);
    hexo.extend.filter.register('after_post_render', toc.heading);
  }

  if (pkgOption('htmlMinifier', 'hexoPlugin').value) {
    hexo.config.html_minifier = assign({exclude: []}, hexo.config.html_minifier);
    hexo.extend.filter.register('after_render:html', require('./html-minifier'));
  }

};

