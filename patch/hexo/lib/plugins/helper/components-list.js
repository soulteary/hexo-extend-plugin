'use strict';

var path = require('path');
var fs = require('fs');

function componentsList () {
    var result = '';
    var params = {};

    for (var i = 0, len = arguments.length; i < len; i++) {
        var source = arguments[i];
        if (typeof source === 'object') {
            Object.keys(source).map(function (item) {
                params[item] = source[item];
            });
        } else if (typeof source === 'string') {
            var pos = source.indexOf('=');
            if (pos > -1)params[source.substring(0, pos)] = source.substring(pos + 1, source.length);
        } else {
            console.log('not support yet.');
        }
    }

    var page = params.page;
    var config = params.config;

    if (page.path.match(/^components\/.+\.html$/)) {
        if (page.path.match(/^components\/.+\/demo\/.*\.html$/)) {
            console.log('sub page', page);
        } else {
            var listData = JSON.parse(fs.readFileSync(path.join(config.source_dir, 'components/list.json')).toString());
            var tpl = '<ul>';
            listData.list.map(function (componentName) {
                tpl += '<li><a href="/' + path.join(path.dirname(page.path), componentName) + '">' + componentName + '</a></li>';
            });
            tpl += '</ul>';
            return tpl;
        }
    }

    return result;
}

module.exports = componentsList;
