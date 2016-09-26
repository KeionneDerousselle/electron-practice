const {app, BrowserWindow, ipcMain, Menu} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const appName = app.getName();

    const menuTemplate = [
        {
            label: appName, //this is typically the default for mac apps, you can have different menu items for a different OS. see http://electron.atom.io/docs/api/menu/
            submenu:[
                {
                    label: `About ${appName}`,
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: "copy:"
                },
                {
                    label: 'Quit',
                    click: () => {app.quit()},
                    accelerator: 'CmdOrCtrl+Q', // this assigns a keyboard shortcut to a menu item
                }
            ]
        },
    ];

   const menu = Menu.buildFromTemplate(menuTemplate);
   Menu.setApplicationMenu(menu);


    mainWindow.on('close', () => {
        mainWindow = null;
    });
});