var fs = require('fs');
var filePath = './files';
var obj = {};
var count = 0;
function getSize(path, object){
    count += 1;
    fs.readdir(path, function(err, files){
        count -= 1;
        files.forEach(function(file){
            var nextPath = path + '/' + file;
            count += 1;
            fs.stat(nextPath, function(err, stats){
                count -= 1;
                if(!stats.isDirectory()){
                    object[file] = stats.size;
                }
                else if(stats.isDirectory()){
                    object[file] = {};
                    getSize(nextPath, object[file]);
                }
                if (count == 0){
                    console.log('done!');
                    var finished = (JSON.stringify(obj, null, 4));
                    fs.writeFile('file-async.json', finished);
                }
            });
        });
    });
}
getSize(filePath, obj);
