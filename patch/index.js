#!/usr/bin/env node

'use strict';

const moduleName = '[hexo-document-plugin@patch-index]';
const log = console.log.bind(console, moduleName);
const error = console.error.bind(console, moduleName);

const fs = require('story-fs');
const path = require('path');
const backup = require('../lib/backup');
const restore = require('../lib/restore');

let hexoBaseDir = path.resolve(__dirname, '../../hexo');
let hexoUtilBaseDir = path.resolve(__dirname, '../../hexo-util');

const hijackPathList = [
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/helper/index.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/helper/index.js'),
    md5: '5829B69AF2262825D4731ECC86B46A49'
  },
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/generator/page.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/page.js'),
    md5: 'AE10C4F1BFE39E37983CFB9987968529'
  },
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/console/index.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/console/index.js'),
    md5: '699A45B14E2197ABC2C162A779CD9275'
  },
  {
    src: path.resolve(__dirname, 'hexo-util/lib/permalink.js'),
    dist: path.resolve(hexoUtilBaseDir, 'lib/permalink.js'),
    md5: '9E2BD212DC61875F30EE6D8D3A95ED98'
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
    log('current only support `backup` or `restore` files.');
    process.exit(1);
    break;
}

Promise.all(hijackPathList.map(action)).then(function() {
  log('execute patch done.');
}).catch(function(e) {
  let err = 'Execute patch fail:' + e;
  error(err);
  throw err;
});
