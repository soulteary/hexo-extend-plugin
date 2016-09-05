'use strict';

const debug = require('./log')('[hexo-extend-plugin@generate]');

const baseDir = process.env.PWD;
const fs = require('story-fs');
const path = require('path');

const postConverter = require('posts-adapter-wp2md-to-hexo/convert');
const postDestroy = require('posts-adapter-wp2md-to-hexo/destroy');
//const makeIndex = require('./make-index');
const syncWatch = require('./watch');

const sourcePostsDir = path.resolve(baseDir, './posts/');
const distPostDir = path.resolve(baseDir, './source/');

let initClean = false;
let hasConvertDocs = false;
let beginWatch = false;

/**
 * convert readdir result as array
 *
 * @param {object} object
 * @returns {Array}
 */
function object2array(object) {
  let arrList = [];
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      arrList.push(object[prop]);
    }
  }
  return arrList;
}

/**
 * process posts in each dir
 *
 * @param {array} dirList
 * @returns {*}
 */
function convertQueue(dirList) {
  return dirList.reduce(function(promiseFactory, dirName) {
    return promiseFactory
        .then(postConverter({
          convert: path.join(sourcePostsDir, dirName),
          dist: path.join(distPostDir, dirName),
          'keep-dir-struct': true
        }))
        .catch(function(e) {
          debug.log('convert dir error:', dirName);
          return new Error(e);
        });
  }, Promise.resolve());
}

/**
 * 判断目录是否就绪
 *
 * @param {array} srcArr 目录路径
 * @returns {Promise} true -> 目录就绪
 */
function checkDirIsReady(srcArr) {

  function check(src) {
    return new Promise(function(resolve, reject) {
      return fs.stat(src).then(function(stats) {
        if (stats.isDirectory()) {
          resolve(true);
        } else {
          reject(`target path has already placed other file ${src}`);
        }
      }).catch(function() {
        debug.log(`check dir \`${path.relative(process.env.PWD, src)}\` ready failed.`);
        resolve(false);
      });
    });
  }

  return Promise.all(srcArr.map(check));
}

/**
 * exports
 *
 * @param {boolean} onlyConvert // not keep watch
 * @returns {Promise.<TResult>}
 */
module.exports = function(onlyConvert) {

  // 默认转换目录可写, 仅考虑转换源是否存在
  return checkDirIsReady([sourcePostsDir]).then(function(dirIsReady) {
    let ready = dirIsReady.every(function(ready) {
      return ready === true;
    });
    if (ready) {
      return true;
    } else {
      throw `${path.relative(process.env.PWD, sourcePostsDir)} is not exist, skip convert posts.`;
    }
  }).then(new Promise(function(resolve, reject) {
    if (initClean === false) {
      return postDestroy(distPostDir).then(function() {
        initClean = true;
        resolve(true);
      }).catch(function() {
        reject(false);
      });
    } else {
      resolve(true);
    }
  })).then(function() {
    if (hasConvertDocs === false) {
      hasConvertDocs = true;
      return fs.readdir(sourcePostsDir).then(function(dirList) {
        let arrList = object2array(dirList);

        return convertQueue(arrList).then(function() {
          // todo check queue result
          debug.log('convert dir list done:', arrList);
          return true;
          // }).then(function() {
          //   return arrList.map(function(dirName) {
          //     // todo bugfix for first make index error
          //     return makeIndex(path.join(distPostDir, dirName));
          //   });
        }).catch(function(e) {
          debug.error('convert dir failed:', e);
          return false;
        });
      });
    } else {

      if (onlyConvert) {
        return true;
      }

      if (!beginWatch) {
        beginWatch = true;
      } else {
        return true;
      }

      debug.log('prepare jobs done.');

      return syncWatch({
        baseDir: path.resolve('.', './posts'),
        distDir: path.resolve('.', './source'),
        fn: function(opt) {
          let dirName = path.dirname(opt.change.replace(sourcePostsDir, ''));
          // 避免关联内容失效, 目录下全量转换
          return postConverter({
            convert: path.join(sourcePostsDir, dirName),
            dist: path.join(distPostDir, dirName),
            'not-sync-meta-file': true,
            overwrite: true
          }).then(function() {
            if (dirName.split('/')[1] === '_posts') {
              //ignore _post dir
              return true;
              //todo bugfix for make index
              //} else {
              //debug.log('make index ', path.join(distPostDir, dirName));
              //return makeIndex(path.join(distPostDir, dirName));
            }
          }).catch(function(e) {
            debug.error('watch error:', e);
          });
        }
      });
    }
  }).catch(function(err) {
    debug.error(err);
    throw err;
  });
};
