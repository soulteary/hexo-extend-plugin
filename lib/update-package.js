let fs = require('story-fs');

module.exports = function (source, dist, enable) {
    try {
        fs.readJSON(source).then(function (sourceContent) {
            return fs.readJSON(dist).then(function (distContent) {
                let result = distContent;
                if (enable) {
                    if(result.hexo){
                        result.hexoOrigin = result.hexo;
                        //todo check version is match
                        result.hexo = sourceContent.hexo;
                    }
                    result.hexoHackedFeature = sourceContent.hexoHackedFeature;
                } else {
                    if (result.hexoOrigin) {
                        result.hexo = result.hexoOrigin;
                        delete result.hexoOrigin;
                    }
                    if (result.hexoHackedFeature) {
                        delete result.hexoHackedFeature;
                    }
                }
                console.log('update dist source:', result);
                return result;
            });
        }).then(function (content) {
            return fs.writeJSON(dist, content);
        }).catch(function (e) {
            console.error(e);
        });
    } catch (e) {
        throw Error(e);
    }
};
