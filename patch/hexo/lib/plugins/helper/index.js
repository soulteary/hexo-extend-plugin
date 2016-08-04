'use strict';

const is_extend = require('hexo-document-plugin/patch/hexo/lib/plugins/helper/is');
const components_list = require('hexo-document-plugin/patch/hexo/lib/plugins/helper/components-list');

module.exports = function(ctx) {
    var helper = ctx.extend.helper;

    var date = require('./date');

    helper.register('date', date.date);
    helper.register('date_xml', date.date_xml);
    helper.register('time', date.time);
    helper.register('full_date', date.full_date);
    helper.register('relative_date', date.relative_date);
    helper.register('time_tag', date.time_tag);
    helper.register('moment', date.moment);

    helper.register('search_form', require('./search_form'));

    var format = require('./format');

    helper.register('strip_html', format.strip_html);
    helper.register('trim', format.trim);
    helper.register('titlecase', format.titlecase);
    helper.register('word_wrap', format.word_wrap);
    helper.register('truncate', format.truncate);

    helper.register('fragment_cache', require('./fragment_cache')(ctx));

    helper.register('gravatar', require('./gravatar'));

    var is = require('./is');
    helper.register('is_current', is.current);
    helper.register('is_home', is.home);
    helper.register('is_post', is.post);
    helper.register('is_page', is.page);
    helper.register('is_archive', is.archive);
    helper.register('is_year', is.year);
    helper.register('is_month', is.month);
    helper.register('is_category', is.category);
    helper.register('is_tag', is.tag);

    var pkg = require('../../../../../package.json');
    if (pkg.hexoHackedFeature['extend_is_helper'] &&
        pkg.hexoHackedFeature['extend_is_helper'][0] === 'on') {
        helper.register('is_homepage', is_extend.homepage);
        helper.register('is_archiveIndex', is_extend.archiveIndex);
        helper.register('is_yearsArchive', is_extend.yearsArchive);
        helper.register('is_404', is_extend.is404);
        helper.register('is_redirect', is_extend.redirect);
        helper.register('is_search', is_extend.search);
        helper.register('is_components', is_extend.components);
    }

    if (pkg.hexoHackedFeature['enable_components_list'] &&
        pkg.hexoHackedFeature['enable_components_list'][0] === 'on') {
        helper.register('components_list', components_list);
    }
    
    helper.register('list_archives', require('./list_archives'));
    helper.register('list_categories', require('./list_categories'));
    helper.register('list_tags', require('./list_tags'));
    helper.register('list_posts', require('./list_posts'));

    helper.register('open_graph', require('./open_graph'));

    helper.register('number_format', require('./number_format'));

    helper.register('paginator', require('./paginator'));

    helper.register('partial', require('./partial')(ctx));

    helper.register('markdown', require('./markdown'));
    helper.register('render', require('./render')(ctx));

    helper.register('css', require('./css'));
    helper.register('js', require('./js'));
    helper.register('link_to', require('./link_to'));
    helper.register('mail_to', require('./mail_to'));
    helper.register('image_tag', require('./image_tag'));
    helper.register('favicon_tag', require('./favicon_tag'));
    helper.register('feed_tag', require('./feed_tag'));

    var tagcloud = require('./tagcloud');
    helper.register('tagcloud', tagcloud);
    helper.register('tag_cloud', tagcloud);

    helper.register('toc', require('./toc'));

    helper.register('relative_url', require('./relative_url'));
    helper.register('url_for', require('./url_for'));

    var debug = require('./debug');
    helper.register('inspect', debug.inspectObject);
    helper.register('log', debug.log);
};
