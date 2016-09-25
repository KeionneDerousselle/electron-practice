const {app, BrowserWindow, ipcMain} = require('electron');
const countdown = require('./countdown');

const windows = [];

app.on('ready', () =>{
  
    [1, 2, 3].forEach(() => {

        let win  = new BrowserWindow({
            height:800,
            width: 800
        });

        win.loadURL(`file://${__dirname}/countdown.html`);

        win.on('close', () =>{
            console.log('closed');
            win = null;
        });

        windows.push(win);
    })
});

ipcMain.on('start-countdown', () => {
    countdown(count => {
        console.log("Count", count)
        windows.forEach(win => {
            win.webContents.send('countdown-started', count);
        });
    });
});



// createOnEvents(ipc)

// //other file
// function createOnEvents(ipc){
//     ipc.on('start-countdown', () =>{
//         countdown();
//     })

//     ipc.on('end-countdown', () =>{
//         endCountdown();
//     })

//     createCountDownEvents(ipc)
//     createOtherEvents(ipc)

// }
