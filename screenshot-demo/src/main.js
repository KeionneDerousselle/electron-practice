const {app, BrowserWindow, globalShortcut} = require('electron');

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        height: 900,
        width:900,
        resizable: false,
        frame: false,
        //show: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    globalShortcut.register('CommandOrControl+Alt+D', () => {
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

