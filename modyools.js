const fs = require("fs");

var getStats = function(path){
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
};

var readDirectory = function(path){
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

module.exports.getStats = getStats;
module.exports.readDirectory = readDirectory;
