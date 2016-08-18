'use strict';

const fs = require('story-fs');

/**
 * 备份文件
 * @param src
 * @param dist
 * @returns {Promise}
 */
function backupFile(src, dist) {
    return new Promise(function (resolve, reject) {
        return fs.readFile(src).then(function (content) {
            return fs.writeFile(dist, content).then(function () {
                return resolve(true);
            }).catch(function (e) {
                return reject(e);
            });
        }).catch(function (e) {
            return reject(e);
        });
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
                return reject(Error('Target file path is already placed by etc type object:' + src));
            }
        }).catch(function (err) {
            if (err.errno === -2) return resolve(false);
            return reject(err);
        });
    });
}

module.exports = function (paths) {
    let srcPath = paths.src;
    let distPath = paths.dist;
    let backupPath = distPath + '.backup';

    return Promise.all([
        isFileReady(srcPath), isFileReady(distPath), isFileReady(backupPath)
    ]).then(function (fileStates) {
        let [srcState, distState, backupState] = fileStates;
        if (srcState && distState) {
            if (backupState) {
                // fake backup origin file, result is ok
                console.log('backup file exist, skip backup...');
                return true;
            } else {
                return backupFile(distPath, backupPath);
            }
        } else {
            if (!srcState) console.log('source file not exist');
            if (!distState) console.log('dist file not exist');
            return false;
        }
    }).then(function (backupOriginResult) {
        if (backupOriginResult) {
            return backupFile(srcPath, distPath).then(function (result) {
                if (result) {
                    console.log('done', distPath);
                } else {
                    console.log('failed', distPath);
                }
            }).catch(function (e) {
                throw e;
            });
        } else {
            throw Error('backup origin file failed, check backup file path.')
        }
    }).catch(function (e) {
        throw e;
    });
};