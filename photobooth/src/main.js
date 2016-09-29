const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () =>{
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('close', () =>{
        mainWindow = null;
    });
});