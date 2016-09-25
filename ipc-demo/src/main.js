const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () =>{
  
  mainWindow = new BrowserWindow({
        height:400,
        width: 400
    });

    mainWindow.loadURL(`file://${__dirname}/countdown.html`);

    mainWindow.on('close', () =>{
        console.log('closed');
        mainWindow = null;
    });
});