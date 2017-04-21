'use strict';
var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var posts = locals.posts.sort(config.index_generator.order_by);
  // hack
  var paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';
  var diff = config.index_generator.diff || 0;

  return pagination('', posts, {
    // hack
    diff: diff,
    hack: true,
    hackType: 'postsIndex',
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
