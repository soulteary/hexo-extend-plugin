const path = require('path');
const baseDir = process.env.PWD;
const fs = require('story-fs');

let initClean = false;
let hasConvertDocs = false;

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


hexo.on('generateBefore', function () {

    const converter = require('story.md/include/convert');
    const destroy = require('story.md/include/destroy');
    const distRootDir = path.resolve(baseDir, './source/');

    function convert(docsList) {
        docsList.map(function (itemName) {
            console.log('convert dir', itemName);
            const sourcePostsDir = path.resolve(baseDir, './posts/' + itemName);
            const distPostDir = path.resolve(baseDir, './source/' + itemName);
            converter({
                convert: sourcePostsDir,
                dist: distPostDir,
                'keep-dir-struct': true
            });
        });
    }

    const originDir = path.resolve(baseDir, './posts');

    (new Promise(function (resolve, reject) {
        if (initClean === false) {
            return destroy(distRootDir).then(function () {
                initClean = true;
                resolve(true);
            }).catch(function () {
                reject(false);
            });
        } else {
            resolve(true);
        }
    })).then(function () {
        if (hasConvertDocs === false) {
            hasConvertDocs = true;
            return fs.readdir(originDir).then(convert);
        } else {
            console.log('prepare done.');

            var syncWatch = require('hexo-document-plugin/lib/watch');
            try {
                var makeIndex = require('hexo-document-plugin/lib/make-index');
            } catch (e) {
                console.log(e);
            }

            syncWatch({
                baseDir: path.resolve('.', './posts'),
                distDir: path.resolve('.', './source'),
                fn: function (opt) {
                    try {
                        let itemName = path.dirname(opt.change.replace(originDir, ''));
                        console.log('convert file', itemName);


                        const sourcePostsDir = path.resolve(baseDir, './posts/' + itemName);
                        const distPostDir = path.resolve(baseDir, './source/' + itemName);
                        converter({
                            convert: sourcePostsDir,
                            dist: distPostDir,
                            'transform-components': itemName.indexOf('components') > -1,
                            overwrite: true
                        });

                        makeIndex(path.resolve('.', './source/components'))

                    } catch (e) {
                        console.log('watch error:', e);
                    }
                }
            });
        }
    });
});
