'use strict';

const fs = require('story-fs');
const path = require('path');

module.exports = function(baseDir) {
  return fs.readdir(baseDir, {encoding: 'utf8'}).then(function(fileList) {
    let result = {'list': []};

    fileList.map(function(fileName) {
      let fullPath = path.join(baseDir, fileName);
      let stats = fs.statSync(fullPath);
      // store abs uri path
      if (stats.isDirectory() || stats.isFile()) {
        result.list.push(fullPath.slice(fullPath.indexOf('/source/') + '/source/'.length));
      }
    });

    result = JSON.stringify(result, null, 4);

    let metaPath = path.join(baseDir, 'list.json');

    // todo auto generate index
    console.log('write file list to', metaPath);
    return fs.writeFile(metaPath, result).then(function() {
      return true;
    }).catch(function(err) {
      if (err) {
        throw err;
      }
    });
  }).catch(function(err) {
    console.log(err);
    return false;
  });
};
