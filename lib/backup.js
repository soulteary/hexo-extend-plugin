'use strict';

const moduleName = '[hexo-document-plugin@backup]';
const log = console.log.bind(console, moduleName);
const error = console.error.bind(console, moduleName);

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
          return resolve(true);
        }).catch(function(e) {
          return reject(e);
        });
      }).catch(function(e) {
        return reject(e);
      });
    });
  }

  if (checksum) {
    return md5(src).then(function(result) {
      if (result === checksum) {
        return true;
      } else {
        throw `source file \`${path.relative(process.env.PWD, src)}\` is broken, skip backup.`;
      }
    }).then(io(src, dist)).catch(function(err) {
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
        return resolve(true);
      } else {
        return reject(Error('Target file path is already placed by etc type object:' + src));
      }
    }).catch(function(err) {
      if (err.errno === -2) {
        return resolve(false);
      }
      return reject(err);
    });
  });
}

module.exports = function(paths) {
  let srcPath = paths.src;
  let distPath = paths.dist;
  let backupPath = distPath + '.backup';

  return Promise.all([
    isFileReady(srcPath), isFileReady(distPath), isFileReady(backupPath)
  ]).then(function(fileStates) {
    let [srcState, distState, backupState] = fileStates;
    if (srcState && distState) {
      if (backupState) {
        // fake backup origin file, result is ok
        log('backup file exist, skip backup...');
        return true;
      } else {
        return backupFile(distPath, backupPath);
      }
    } else {
      if (!srcState) {
        error('source file not exist');
      }
      if (!distState) {
        error('dist file not exist');
      }
      return false;
    }
  }).then(function(backupOriginResult) {
    if (backupOriginResult) {
      return backupFile(srcPath, distPath).then(function(result) {
        if (result) {
          log('done', distPath);
        } else {
          error('failed', distPath);
        }
      }).catch(function(e) {
        throw e;
      });
    } else {
      throw Error('backup origin file failed, check backup file path.')
    }
  }).catch(function(e) {
    error(e);
    throw e;
  });
};
