'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (baseDir) {
    fs.readdir(baseDir, {encoding: 'utf8'}, function (err, data) {

        if (err) return false;

        let result = {'list': []};

        data.map(function (componentName) {
            let componentPath = path.join(baseDir, componentName);

            let stats = fs.statSync(componentPath);

            if (stats.isDirectory() || stats.isFile()) {
                result.list.push(componentName);
            }
        });

        result = JSON.stringify(result, null, 4);

        // todo auto generate index
        console.log('write file list to', path.join(baseDir, 'list.json'));
        return fs.writeFile(path.join(baseDir, 'list.json'), result, function (err) {
            if (err) throw err;
        });
    });
};



