var merge = require('utils-merge');
var util = require('util');

function pagination(base, posts, options) {
  if (typeof base !== 'string') {
    throw new TypeError('base must be a string!');
  }
  if (!posts) {
    throw new TypeError('posts is required!');
  }
  options = options || {};

  if (base && base[base.length - 1] !== '/') {
    base += '/';
  }

  var length = posts.length;
  var perPage = options.hasOwnProperty('perPage') ? +options.perPage : 10;
  var total = perPage ? Math.ceil(length / perPage) : 1;
  var format = options.format || 'page/%d/';
  var layout = options.layout || ['archive', 'index'];
  var data = options.data || {};
  var result = [];
  var urlCache = {};

  // hacks
  var diff = options.diff || 0;

  function formatURL(i) {
    if (urlCache[i]) {
      return urlCache[i];
    }

    var url = base;
    if (i > 1) {
      url += util.format(format, i);
    }
    urlCache[i] = url;

    return url;
  }

  function makeData(i) {
    var data = {
      base: base,
      total: total,
      current: i,
      current_url: formatURL(i),
      posts: perPage ? posts.slice(perPage * (i - 1), perPage * i) : posts,
      prev: 0,
      prev_link: '',
      next: 0,
      next_link: ''
    };

    if (i > 1) {
      data.prev = i - 1;
      data.prev_link = formatURL(data.prev);
    }

    if (i < total) {
      data.next = i + 1;
      data.next_link = formatURL(data.next);
    }

    return data;
  }

  if (perPage) {
    for (var i = 1; i <= total; i++) {
      result.push({
        path: formatURL(i),
        layout: layout,
        data: merge(makeData(i), data)
      });
    }
  } else {
    result.push({
      path: base,
      layout: layout,
      data: merge(makeData(1), data)
    });
  }


  //hack for homepage diy
  if (diff && result.length) {

    let lastData = null;
    let idx = 0;

    for (let i = 0; i < result.length; i++) {
      let page = result[i];
      if (page.path === '' && page.data.current_url === '') {
        lastData = Object.assign({}, result[i]);
        lastData.data = Object.assign({}, result[i].data);
        idx = i;
        break;
      }
    }

    if (lastData) {
      result.push(lastData);
      result[result.length - 1].path = 'blog/';
      result[result.length - 1].data.current_url = 'blog/';
      result[result.length - 1].data.next_link = 'blog/page/2/';

      // fix homepage
      result[idx].data.next_link = '';
      result[idx].data.current_url = '';
      result[idx].path = ''
    }

  }

  return result;
}

module.exports = pagination;