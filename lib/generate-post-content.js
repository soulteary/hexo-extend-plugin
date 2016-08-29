'use strict';

const debug = require('./log')('[hexo-extend-plugin@generate]');

const baseDir = process.env.PWD;
const fs = require('story-fs');
const path = require('path');

const postConverter = require('story.md/include/convert');
const postDestroy = require('story.md/include/destroy');
const makeIndex = require('./make-index');
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
 * exports
 *
 * @param {boolean} onlyConvert // not keep watch
 * @returns {Promise.<TResult>}
 */
module.exports = function(onlyConvert) {

  return (new Promise(function(resolve, reject) {
    if (initClean === false) {
      return postDestroy(distPostDir).then(function() {
        initClean = true;
        return resolve(true);
      }).catch(function() {
        return reject(false);
      });
    } else {
      return resolve(true);
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
            } else {
              debug.log('make index ', path.join(distPostDir, dirName));
              return makeIndex(path.join(distPostDir, dirName));
            }
          }).catch(function(e) {
            debug.error('watch error:', e);
          });
        }
      });
    }
  });
};
