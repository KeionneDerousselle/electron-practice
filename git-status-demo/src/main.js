const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        height: 100,
        width: 400
    });

    mainWindow.loadURL(`file://${__dirname}/status.html`);

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});
