const modules = require('./modyools.js');
var files = __dirname + "/files";

const fs = require("fs");

var getStats = function(path){
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {
            if (err) {
                reject(err);
            }
            else if (!stats.isDirectory()){
                console.log(path + " is not a directory" );
                resolve(false);
            }
            else {
                console.log(path + " is a directory" );
                recursiveRead(path).then(function(){
                    resolve(true);
                });
            }
        });
    });
};

var recursiveRead = function(pathToRead){
    return new Promise(function(resolve){
        modules.readDirectory(pathToRead).then(function(val){
            var promiseArray =  val.map(function(file){
                return getStats(pathToRead + '/' + file);
            });
            Promise.all(promiseArray).then(function(){
                resolve("Done");
            }).catch(function(err){
                console.log(err);
            });
        });
    });

};


recursiveRead(files).then(function(val){
    console.log(val);
});
