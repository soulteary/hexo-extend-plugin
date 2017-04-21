'use strict';

const cheerio = require('cheerio');
const urlParser = require('url').parse;

function isExternal(url, config) {
  let exclude = config.nofollow.exclude;
  let myhost = urlParser(config.url).hostname;
  let hostname = urlParser(url).hostname;
  if (!hostname) {
    return false;
  }

  if (exclude && !Array.isArray(exclude)) {
    exclude = [exclude];
  }

  if (exclude && exclude.length) {
    for (let i = 0, len = exclude.length; i < len; i++) {
      if (hostname == exclude[i]) {
        return false;
      }
    }
  }

  return hostname !== myhost;
}

module.exports = function(source) {
  let config = this.config;
  let $ = cheerio.load(source, {decodeEntities: false});
  $('a').each(function(index, element) {
    let href = $(element).attr('href');
    if (href && isExternal(href, config)) {
      $(element).attr({
        rel: 'external nofollow noopener noreferrer',
        target: '_blank'
      });
    }
  });

  return $.html();
};
