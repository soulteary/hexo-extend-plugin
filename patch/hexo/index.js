const fs = require('story-fs');
const path = require('path');

let hexoBaseDir = path.resolve(__dirname, '../../../hexo');

const hijackPathList = [
    {
        src : path.resolve(__dirname, 'lib/plugins/helper/index.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/helper/index.js')
    },
    {
        src : path.resolve(__dirname, 'lib/plugins/generator/page.js'),
        dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/page.js')
    }
];

function overwrite (src, dist) {
    return fs.readFile(src).then(function (content) {
        return fs.writeFile(dist, content);
    }).catch(function (e) {
        console.log('overwrite file error', e);
    });
}

hijackPathList.map(function (file) {
    fs.exists(file.dist).then(function (targetFileExist) {
        if (!targetFileExist) return false;
        return fs.readFile(file.dist).then(function (content) {
            const backupPath = file.dist + '.backup';
            return fs.exists(backupPath).then(function (backupExist) {
                if (backupExist) {
                    return overwrite(file.src, file.dist);
                } else {
                    return fs.writeFile(backupPath, content).then(function () {
                        return overwrite(file.src, file.dist);
                    });
                }
            });
        });
    });
});
