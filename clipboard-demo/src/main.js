const {app, BrowserWindow, Tray, Menu} = require('electron');

const mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 800
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});