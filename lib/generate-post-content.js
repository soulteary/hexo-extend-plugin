const path = require('path');
const baseDir = process.env.PWD;
const fs = require('story-fs');

let initClean = false;
let hasConvertDocs = false;

module.exports = function () {
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
};
