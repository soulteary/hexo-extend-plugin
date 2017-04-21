/* global hexo */

'use strict';
const pkgOption = require('hexo-extend-plugin/lib/check-pkg-option');

if (pkgOption('upgrade_hexo_generator_archive').value) {
  hexo.config.index_generator = Object.assign({
    per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
    order_by: '-date',
    //hack
    diff: hexo.config.index_generator.diff === 'undefined' ? 0 : hexo.config.index_generator.diff
  }, hexo.config.index_generator);
  hexo.extend.generator.register('index', require('hexo-extend-plugin/feature/index-generator/index'));
} else {
  hexo.config.index_generator = Object.assign({
    per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
    order_by: '-date'
  }, hexo.config.index_generator);

  hexo.extend.generator.register('index', require('./lib/generator'));
}
