const Electron = require('electron');

const ipc = Electron.ipcRenderer;

document.getElementById('startCountdownBtn').addEventListener('click', () =>{
    ipc.send('start-countdown');
});

ipc.on('countdown-started', (event, count) => {
    document.getElementById('count').innerHTML = count;
});