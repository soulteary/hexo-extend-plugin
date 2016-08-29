'use strict';

const debug = require('./log')('[hexo-extend-plugin@restore]');

const fs = require('story-fs');
const md5 = require('./md5');
const path = require('path');

/**
 * 复写文件
 *
 * @param {string} src
 * @param {string} dist
 * @param {string} checksum
 * @returns {Promise}
 */
function overwrite(src, dist, checksum) {

  function io(src, dist) {
    return new Promise(function(resolve, reject) {
      return fs.readFile(src).then(function(content) {
        return fs.writeFile(dist, content).then(function() {
          resolve(true);
        }).catch(function(e) {
          reject(e);
        });
      }).catch(function(e) {
        reject(e);
      });
    });
  }

  if (checksum) {
    return md5(src)
        .then(function(result) {
          return new Promise(function(resolve, reject) {
            if (result === checksum) {
              resolve(true);
            } else {
              reject(`backup file \`${path.relative(process.env.PWD, src)}\` is broken, skip restore.`);
            }
          });
        })
        .then(io(src, dist))
        .catch(function(err) {
          throw err;
        });
  } else {
    return io(src, dist);
  }
}

/**
 * 检查文件是否就绪
 *
 * @param {string} src
 * @returns {Promise} true -> 文件已存在
 */
function isFileReady(src) {
  return new Promise(function(resolve, reject) {
    return fs.stat(src).then(function(stats) {
      if (stats.isFile()) {
        resolve(true);
      } else {
        reject(`target file path is already placed by etc type object: ${src}`);
      }
    }).catch(function(err) {
      if (err.errno === -2) {
        resolve(false);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = function(paths) {
  let distPath = paths.dist;
  let backupPath = distPath + '.backup';
  let md5 = paths.md5;

  return Promise.all([
    isFileReady(distPath), isFileReady(backupPath)
  ]).then(function(fileStates) {
    let [distState, backupState] = fileStates;
    if (distState && backupState) {
      return overwrite(backupPath, distPath, md5);
    } else {
      if (!backupState) {
        debug.error('backup file not exist');
      }
      if (!distState) {
        debug.error('dist file not exist');
      }
      return false;
    }
  }).then(function(backupOriginResult) {
    if (backupOriginResult) {
      debug.log('revert file done:', path.relative(process.env.PWD, distPath));
      return true;
    } else {
      throw Error('revert origin file failed.');
    }
  }).catch(function(e) {
    debug.error(e);
    throw e;
  });
};
