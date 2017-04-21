const toc = require('markdown-toc');
const cheerio = require('cheerio');

function insert(data) {
  let options = Object.assign({}, this.config.toc);
  // add class option
  if (options.class) {
    data.content = data.content.replace("<!-- toc -->", '<div class="' + options.class + 'Start"></div><!-- toc --><div class="' + options.class + 'End"></div>');
  }
  data.content = toc.insert(data.content, options);
  return data;
}

function heading(data) {
  let options = Object.assign({}, this.config.toc);
  let $ = cheerio.load(data.content, {decodeEntities: false});
  let headings = $('h1, h2, h3, h4, h5, h6');
  headings.each(function() {
    let $title = $(this);
    let title = $title.text();
    let id = slugify(title, options);
    $title.attr('id', id);

    if (options.anchor) {
      let anchorOpts = Object.assign(
          {
            position: 'after',
            symbol: '#',
            style: 'header-anchor'
          }, options.anchor);

      //  Put the anchor after the title by default, unless says otherwise
      let link = '<a href="' + id + '" class="' + anchorOpts.style + '">"' + anchorOpts.symbol + '"</a>';
      if (anchorOpts.position === 'before') {
        $title.prepend(link);
      } else {
        $title.append(link);
      }
    }
  });
  data.content = $.html();
  // add class option
  if (options.class) {
    data.content = data.content.replace('<div class="' + options.class + 'Start"></div>', '<div class="' + options.class + '">').replace('<div class="' + options.class + 'End"></div>', '</div>');
  }
  return data;
}

module.exports = {
  insert: insert,
  heading: heading
};
