var fs = require('fs');

function readContents(path){
    fs.readdir(path, function(err, files){
        if (err){
            console.log(err);
            process.exit;
        }
        console.log(path + ' contains ' + files.join(', '));
        files.forEach(function(file){
            var nextPath = path + '/' + file;
            fs.stat(nextPath, function(err, stats){
                if (err){
                    console.log(err);
                    process.exit;
                }
                if (stats.isDirectory()){
                    readContents(nextPath);
                }
            });
        });
    });
}

readContents('./files');
