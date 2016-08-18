const fs = require('story-fs');
const path = require('path');
const backup = require('../../lib/backup');
const restore = require('../../lib/restore');

let hexoBaseDir = path.resolve(__dirname, '../../../hexo');

const hijackPathList = [
    {
        src: path.resolve(__dirname, 'lib/plugins/helper/index.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/helper/index.js')
    },
    {
        src: path.resolve(__dirname, 'lib/plugins/generator/page.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/page.js')
    },
    {
        src: path.resolve(__dirname, 'lib/plugins/console/index.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/console/index.js')
    }
];

let action = null;
switch (process.argv[2].slice(2)) {
    case 'backup':
        action = backup;
        break;
    case 'restore':
        action = restore;
        break;
    default:
        console.log('Hexo-document-plugin only support `backup` or `restore` files.');
        process.exit(1);
        break;
}

Promise.all(hijackPathList.map(action)).then(function () {
    console.info('execute patch done.');
}).catch(function (e) {
    throw 'Execute patch fail:' + e
});
