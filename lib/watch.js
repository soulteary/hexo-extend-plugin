'use strict';

const exec = require('child_process').spawn;
const fs = require('fs');
const path = require('path');

const log = console.log.bind(console);
const error = console.error.bind(console);

const chokidar = require('chokidar');

// example:
//
// var syncWatch = require('hexo-document-plugin/lib/watch');
// syncWatch({
//     baseDir: path.resolve('.', './posts'),
//     distDir: path.resolve('.', './source')
// });

function syncFile(src, dest) {
    function sync(from, to) {
        exec(`cp -f ${from} ${to}`);
        log(`sync ${from} ${to}`);
    }

    fs.stat(src, (err, stats) => {
        if (err) {
            log('sync error, retry', src);
            (function deferSync(from, to) {
                setTimeout(function defer() {
                    sync(from, to);
                }, 100);
            })(src, dest);
        } else {
            if (stats.isFile() && fs.statSync(src)) {
                sync(src, dest);
            } else {
                log('ignore dir, sync dir need manual run cli `npm run build`');
            }
        }
    });
}

module.exports = function (options) {
    options = options || {};

    let baseDir = options.baseDir;
    let distDir = options.distDir;

    let ignoreDirs = options.ignoreDirs;
    if (!ignoreDirs) ignoreDirs = [];

    let fileType = options.filetype;
    if (!fileType) fileType = ['.*'];

    let fn = options.fn;
    var watcher = chokidar.watch(baseDir, {
        ignored: ignoreDirs,
        persistent: true
    });

    function inDirsList(src, opt) {
        return opt.some(dir => src.indexOf(dir) === 0);
    }

    watcher
        .on('error', error => log(`Watcher error: ${error}`))
        //.on('ready', () => {
        //log('watch server list:');
        //log(watcher.getWatched());
        //})
        .on('change', (filePath, stats) => {
            if (stats) {
                log(`File ${filePath} changed size to ${stats.size}`);
            } else {
                log(`File ${filePath} changed`);
            }

            if (path.extname(filePath).match(fileType) && !inDirsList(filePath, ignoreDirs)) {
                if (fn) {
                    let opt = Object.assign({}, options);
                    delete opt.fn;
                    opt.change = filePath;
                    fn(opt);
                } else {
                    syncFile(filePath, filePath.replace(baseDir, distDir));
                }
            }
        });
};