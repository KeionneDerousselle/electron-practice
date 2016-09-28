const {desktopCapturer, ipcRenderer: ipc, screen} = require('electron');
const fs = require('fs');
const path = require('path');

function getMainSource(desktopCapturer, screen, done){
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize };
    
    desktopCapturer.getSources(options, (err, sources) => {
        if(err) return console.log('Cannot capture a screen: ', err);

        const isMainSource = source => source.name === 'Entire Screen' || source.name === 'Screen 1';
        done(sources.filter(isMainSource)[0]);
    });
}

function onCapture(event, targetDir){
    getMainSource(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng();
        let today = new Date().toLocaleDateString().replace(/[/]/g, '-'); //.toISODString();
        const filePath = path.join(targetDir, today + '.png');
        writeScreenshot(png, filePath);
    });
}

function writeScreenshot(png, filePath){
    fs.writeFile(filePath, png, err => {
        if(err) return console.log('Failed to write to screen: ', err);
    });
}

ipc.on('capture', onCapture);