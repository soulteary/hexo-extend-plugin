'use strict';

const debug = require('./log')('[hexo-extend-plugin@backup]');

const fs = require('story-fs');
const md5 = require('./md5');
const path = require('path');

/**
 * 备份文件
 *
 * @param {string} src
 * @param {string} dist
 * @param {string} checksum
 * @returns {Promise}
 */
function backupFile(src, dist, checksum) {
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
              reject(`source file \`${path.relative(process.env.PWD, src)}\` is broken, skip backup.`);
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
  let srcPath = paths.src;
  let distPath = paths.dist;
  let backupPath = distPath + '.backup';
  let checksum = paths.md5;
  let ver = paths.ver;

  return Promise.all([
    isFileReady(srcPath), isFileReady(distPath), isFileReady(backupPath)
  ]).then(function(fileStates) {
    let [srcState, distState, backupState] = fileStates;
    if (srcState && distState) {
      if (backupState) {
        // fake backup origin file, result is ok
        debug.log('backup file exist, skip backup...');
        return true;
      } else {
        return md5(distPath).then(function(response) {
          if (response === checksum) {
            debug.log(`apply ${ver} patch for ${path.relative(process.env.PWD, distPath)}`);
            return backupFile(distPath, backupPath);
          } else {
            debug.log(`file checksum not match, skip ${ver} patch for ${path.relative(process.env.PWD, distPath)}`);
            return true;
          }
        });
      }
    } else {
      if (!srcState) {
        debug.error('source file not exist', srcPath);
      }
      if (!distState) {
        debug.error('dist file not exist', distPath);
      }
      return false;
    }
  }).then(function(backupOriginResult) {
    if (backupOriginResult) {
      return backupFile(srcPath, distPath).then(function(result) {
        if (result) {
          debug.log('done', path.relative(process.env.PWD, distPath));
        } else {
          debug.error('failed', path.relative(process.env.PWD, distPath));
        }
      }).catch(function(e) {
        throw e;
      });
    } else {
      throw Error('backup origin file failed, check backup file path.');
    }
  }).catch(function(e) {
    debug.error(e);
    throw e;
  });
};
