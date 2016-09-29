const {app, BrowserWindow, ipcMain: ipc} = require('electron');
const images = require('./images');

let mainWindow;

app.on('ready', () =>{
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.webContents.openDevTools();

    images.mkdir(images.getPicturesDir(app));

    mainWindow.on('close', () =>{
        mainWindow = null;
    });
});

ipc.on('image-captured', (event, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) =>{
        images.cache(imgPath);
    });
});

ipc.on('image-remove', (event, index) =>{
    images.rm(index, () =>{
        event.sender.send('image-removed', index);
    });
});