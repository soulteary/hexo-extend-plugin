/* global hexo */

'use strict';

const pkgOption = require('hexo-extend-plugin/lib/check-pkg-option');

var assign = require('object-assign');

// when archive disabled pagination, per_page should be 0.
var per_page;

if (hexo.config.archive === 1) {
  per_page = 0;
} else if (typeof hexo.config.per_page === 'undefined') {
  per_page = 10;
} else {
  per_page = hexo.config.per_page;
}

hexo.config.archive_generator = assign({
  per_page: per_page,
  yearly: true,
  monthly: true,
  daily: false
}, hexo.config.archive_generator);

if (pkgOption('upgrade_hexo_generator_archive').value) {
  hexo.extend.generator.register('archive', require('hexo-extend-plugin/feature/archive-generator/index'));
} else {
  hexo.extend.generator.register('archive', require('./lib/generator'));
}

