const fs = require('story-fs');
const path = require('path');
const backup = require('../../lib/backup');

let hexoBaseDir = path.resolve(__dirname, '../../../hexo');

const hijackPathList = [
    {
        src: path.resolve(__dirname, 'lib/plugins/helper/index.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/helper/index.js')
    },
    {
        src: path.resolve(__dirname, 'lib/plugins/generator/page.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/page.js')
    }
];

Promise.all(hijackPathList.map(backup)).then(function () {
    console.info('excute patch done.');
}).catch(function (e) {
    throw 'Excute patch fail:' + e
});
