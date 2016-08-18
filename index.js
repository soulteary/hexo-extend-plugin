/**
 * DemoBox tag
 *
 * Syntax:
 *   {% demobox href="/path/to/your/demo/page" with=300px height=300px %}
 *
 */

hexo.extend.tag.register('demobox', function (args) {
    var params = {};

    args.every(function (item) {
        var pos = item.indexOf('=');
        if (pos > -1)params[item.substring(0, pos)] = item.substring(pos + 1, item.length);
    });

    var style = "border: 10px solid #ede; width: ' + (params.width ? params.width : '100%') + '; height: ' + (params.height ? params.height : '100%') + '; ";

    return '<div class="demo-container" style="' + style + '"><iframe width="100%" height="100%" src="' + (params.href ? params.href : 'about:blank') + '" frameborder="0" allowfullscreen></iframe></div>'
});

hexo.on('ready', require('./bin/convert'));

hexo.on('generateBefore', require('./lib/generate-post-content'));
