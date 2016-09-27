var fs = require('fs');
var filePath = './files';
var files = fs.readdirSync(filePath);
var obj = {};

function getSize(path, object){
    files.forEach(function(file){
        var nextPath = path + '/' + file;
        var stat = fs.statSync(nextPath);
        if(!stat.isDirectory()){
            object[file] = stat.size;
        }
        else if(stat.isDirectory()){
            files = fs.readdirSync(nextPath);
            object[file] = getSize(nextPath, {});
        }
        return object;
    });
    return object;
}

var fin = JSON.stringify(getSize(filePath, obj), null, 4);

fs.writeFile('files.json', fin);
