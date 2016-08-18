'use strict';

function pageGenerator(locals) {
    return locals.pages.map(function (page) {
        var layout = page.layout;
        var path = page.path;


        var pkg = require('../../../../../package.json');
        if (pkg.hexoHackedFeature &&
            pkg.hexoHackedFeature['enable_components_demo_raw_content'] &&
            pkg.hexoHackedFeature['enable_components_demo_raw_content'][0] === 'on') {

            // ignore components demo layout
            if (path.match(/^components\/\S+\/demo\/.*/)) {
                return {
                    path: path,
                    data: page.content
                }
            }
        }

        // todo 完善转义列表
        if (pkg.hexoHackedFeature &&
            pkg.hexoHackedFeature['cancel_escape_at_document_title'] &&
            pkg.hexoHackedFeature['cancel_escape_at_document_title'][0] === 'on') {
            page.title = page.title.replace(/&gt;/g, '>').replace(/&lt;/, '<');
        }

        if (!layout || layout === 'false' || layout === 'off') {
            return {
                path: path,
                data: page.content
            };
        }

        var layouts = ['page', 'post', 'index'];
        if (layout !== 'page') layouts.unshift(layout);

        page.__page = true;

        return {
            path: path,
            layout: layouts,
            data: page
        };
    });
}

module.exports = pageGenerator;