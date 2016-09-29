const fs = require('fs');
const path = require('path');

const logError = err => err && console.error(err);

let images = [];

exports.save = (picturesPath, contents, done) => {
    const base64Data = contents.replace(/^data:image\/png;base64,/, '');
    let today = new Date().toLocaleDateString().replace(/[/]/g, '-'); //.toISODString();
    const imgPath = path.join(picturesPath, `${today}.png`);
    fs.writeFile(imgPath, base64Data, {encoding: 'base64'}, error => {
        if(error)
        {
            return logError(error);
        }

        done(null, imgPath);
    });
};

exports.getPicturesDir = app => {
   return path.join(app.getPath('pictures'), 'photobooth');
};

exports.mkdir = picturesPath => {
    fs.stat(picturesPath, (err, stats) => {
        if(err && err.code !== 'ENOENT'){
            return logError(err);
        }
        else if(err || !stats.isDirectory()){
            fs.mkdir(picturesPath, logError)
        }
    });
};

exports.rm = (index, done) => {
    fs.unlink(images[index], error => {
        console.log("unlink")
        if(error) return logError(error);

        images.splice(index, 1);
        done();
    })
};

exports.cache = imgPath => {
    images = images.concat([imgPath]);
    return images;
}

exports.getFromCache = index => {
    return images[index];
};