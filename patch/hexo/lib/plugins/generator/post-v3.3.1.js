'use strict';

const pkgOption = require('hexo-extend-plugin/lib/check-pkg-option');

function postGenerator(locals) {
  var posts = locals.posts.sort('date').toArray();
  var length = posts.length;

  return posts.map(function(post, i) {
    var layout = post.layout;
    var path = post.path;

    if (pkgOption('remove_date_prefix_in_post_url').value) {
      path = path.replace(/^\d{4}\/\d{2}\/\d{2}\//g, '').replace(/\/$/, '.html');
    }

    if (!layout || layout === 'false') {
      return {
        path: path,
        data: post.content
      };
    }

    if (i) {
      post.prev = posts[i - 1];
    }
    if (i < length - 1) {
      post.next = posts[i + 1];
    }

    var layouts = ['post', 'page', 'index'];
    if (layout !== 'post') {
      layouts.unshift(layout);
    }

    post.__post = true;

    return {
      path: path,
      layout: layouts,
      data: post
    };
  });
}

module.exports = postGenerator;
