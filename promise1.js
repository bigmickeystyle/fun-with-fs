const modules = require('./modyools.js');
var files = __dirname + "/files";
var promiseArray = [];

function recursiveRead(readfiles){
    modules.readDirectory(readfiles).then(function(val){
        var fullFiles = val.map(function(file){
            var path = readfiles + '/' + file;
            return path;
        });
        return fullFiles;
    }).then(function(val){
        var fullFilesPromises =  val.map(function(file){
            return modules.getStats(file);
        });
        var fileNames =  val;
        Promise.all(fullFilesPromises).then(function(val){
            for(var i = 0; i < val.length; i++){
                if (!val[i].isDirectory()){
                    console.log(fileNames[i] + " is not a directory!");
                }
                else {
                    console.log(fileNames[i] + " is a directory");
                    promiseArray.push(recursiveRead(fileNames[i]));
                }
            }
            Promise.all(promiseArray);
        });
    }).then(function(){
        console.log("done!");
    });
}

recursiveRead(files);
