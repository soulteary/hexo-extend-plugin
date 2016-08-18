const path = require('path');
const baseDir = process.env.PWD;
const fs = require('story-fs');

let initClean = false;
let hasConvertDocs = false;

module.exports = function (onlyConvert) {
    const converter = require('story.md/include/convert');
    const destroy = require('story.md/include/destroy');

    const sourcePostsDir = path.resolve(baseDir, './posts/');
    const distPostDir = path.resolve(baseDir, './source/');

    function convert(docsList) {
        let arrList = [];
        for (let prop in docsList) {
            if (docsList.hasOwnProperty(prop)) arrList.push(docsList[prop]);
        }

        function convertQueue(arr) {
            return arr.reduce(function (promiseFactory, itemName) {
                return promiseFactory.then(function () {
                    return converter({
                        convert: path.join(sourcePostsDir, itemName),
                        dist: path.join(distPostDir, itemName),
                        'keep-dir-struct': true
                    });
                }).catch(function (e) {
                    console.log('convert dir error:', itemName);
                    return new Error(e);
                });
            }, Promise.resolve())
        }

        return convertQueue(arrList).then(function (e) {
            console.log('convert dir done:', arrList);
        });
    }

    const originDir = path.resolve(baseDir, './posts');

    (new Promise(function (resolve, reject) {
        if (initClean === false) {
            return destroy(distPostDir)
                .then(function () {
                    initClean = true;
                    return resolve(true);
                }).catch(function () {
                    return reject(false);
                });
        } else {
            return resolve(true);
        }
    })).then(function () {
        if (hasConvertDocs === false) {
            hasConvertDocs = true;
            return fs.readdir(originDir).then(convert);
        } else {
            if (onlyConvert) return true;

            console.log('prepare done.');

            var syncWatch = require('hexo-document-plugin/lib/watch');
            try {
                var makeIndex = require('hexo-document-plugin/lib/make-index');
            } catch (e) {
                console.log(e);
            }

            return syncWatch({
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
