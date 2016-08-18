const fs = require('story-fs');


/**
 * 备份文件
 * @param src
 * @param dist
 * @returns {Promise}
 */
function overwrite(src, dist) {
    return new Promise(function (resolve, reject) {
        try {
            return fs.readFile(src).then(function (content) {
                try {
                    return fs.writeFile(dist, content).then(function () {
                        return resolve(true);
                    });
                } catch (e) {
                    return reject(e);
                }
            });
        }
        catch (e) {
            return reject(e);
        }
    });
}


/**
 * 检查文件是否就绪
 * @param src
 * @returns {boolean} true -> 文件已存在
 */
function isFileReady(src) {
    return new Promise(function (resolve, reject) {
        return fs.stat(src).then(function (stats) {
            if (stats.isFile()) {
                return resolve(true);
            } else {
                return reject(Error('Target file path is already placehold by etc type object:' + src));
            }
        }).catch(function (err) {
            if (err.errno === -2) return resolve(false);
            return reject(err);
        });
    });
}


module.exports = function (paths) {
    let distPath = paths.dist;
    let backupPath = distPath + '.backup';

    return Promise.all([
        isFileReady(distPath), isFileReady(backupPath)
    ]).then(function (fileStates) {
        let [distState, backupState] = fileStates;
        if (distState && backupState) {
            return overwrite(backupPath, distPath);
        } else {
            if (!backupState) console.log('backup file not exist');
            if (!distState) console.log('dist file not exist');
            return false;
        }
    }).then(function (backupOriginResult) {
        if (backupOriginResult) {
            console.log('revert file done:', distPath);
            return true;
        } else {
            throw Error('revert origin file failed.')
        }
    }).catch(function (e) {
        throw e;
    });
};
