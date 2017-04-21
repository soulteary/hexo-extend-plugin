#!/usr/bin/env node

'use strict';

const debug = require('../lib/log')('[hexo-extend-plugin@patch-index]');

const fs = require('story-fs');
const path = require('path');
const backup = require('../lib/backup');
const restore = require('../lib/restore');

let nodeModulesDir = path.resolve(__dirname, '../../');
let hexoBaseDir = path.resolve(__dirname, '../../hexo');
let hexoUtilBaseDir = path.resolve(__dirname, '../../hexo-util');

const hijackPathList = [
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/helper/index.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/helper/index.js'),
    md5: '5829B69AF2262825D4731ECC86B46A49',
    ver: '3.2.0'
  },
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/generator/page.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/page.js'),
    md5: 'AE10C4F1BFE39E37983CFB9987968529',
    ver: '3.2.0'
  },
  { // Hexo v3.2.0
    src: path.resolve(__dirname, 'hexo/lib/plugins/generator/post.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/post.js'),
    md5: '96C9F0FF0BA3A97C4E5241D16A50FDC0',
    ver: '3.2.0'
  },
  { // Hexo v3.3.1
    src: path.resolve(__dirname, 'hexo/lib/plugins/generator/post-v3.3.1.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/generator/post.js'),
    md5: 'AB9F0A7E042E838B5B4F194F82FEEF82',
    ver: '3.3.1'
  },
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/console/index.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/console/index.js'),
    md5: '699A45B14E2197ABC2C162A779CD9275',
    ver: '3.2.0'
  },
  {
    src: path.resolve(__dirname, 'hexo-util/lib/permalink.js'),
    dist: path.resolve(hexoUtilBaseDir, 'lib/permalink.js'),
    md5: '9E2BD212DC61875F30EE6D8D3A95ED98',
    ver: '3.2.0'
  },
  {
    src: path.resolve(__dirname, 'hexo/lib/plugins/filter/after_post_render/index.js'),
    dist: path.resolve(hexoBaseDir, 'lib/plugins/filter/after_post_render/index.js'),
    md5: '6238583EDAE87F4C06CA1DF455156566',
    ver: '3.3.1'
  },
  {
    src: path.resolve(__dirname, 'hexo-generator-archive/index.js'),
    dist: path.resolve(nodeModulesDir, 'hexo-generator-archive/index.js'),
    md5: 'EF64AF6AD6D436B3CFFD31E52E77B086',
    ver: '0.1.4'
  },
  {
    src: path.resolve(__dirname, 'hexo-generator-index/index.js'),
    dist: path.resolve(nodeModulesDir, 'hexo-generator-index/index.js'),
    md5: '244A9F117A839EF7BE3CC75227B27FC1',
    ver: '0.2.0'
  },
  {
    src: path.resolve(__dirname, 'hexo-pagination/lib/pagination.js'),
    dist: path.resolve(nodeModulesDir, 'hexo-pagination/lib/pagination.js'),
    md5: '95918298CFA7F28E09EE1720B93A0130',
    ver: '0.0.2'
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
    debug.log('current only support `backup` or `restore` files.');
    process.exit(1);
    break;
}

Promise.all(hijackPathList.map(action)).then(function() {
  debug.log('execute patch done.');
}).catch(function(e) {
  let err = 'execute patch fail:' + e;
  debug.error(err);
  throw err;
});
