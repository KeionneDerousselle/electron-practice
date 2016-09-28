const {app, BrowserWindow, clipboard, Tray, Menu, globalShortcut} = require('electron');
const path = require('path');

const STACK_SIZE = 8;
const ITEM_MAX_LENGTH = 30;

let mainWindow;

function checkClipboardForChange(clipboard, onChange)
{
    let cache = clipboard.readText();
    let latest;

    setInterval( () => {
        latest = clipboard.readText();
        if(latest !== cache){
            cache = latest;
            onChange(cache);
        }
    }, 1000);
}

function addToStack(item, stack){
    if(stackIsFull(stack))
    {
        stack = removeLastItemFromStack(stack);
    }
    return [item].concat(stack);
}

function stackIsFull(stack)
{
    return stack.length >= STACK_SIZE;
}

function removeLastItemFromStack(stack)
{
    return stack.slice(0, stack.length -1);
}

function formatMenuTemplateFromStack(stack){
    return stack.map((item, i) => {
        return{
            label: `Copy ${formatItem(item)}`,
            click: () => clipboard.writeText(item),
            accelerator: `CmdOrCtrl+Alt+${i+1}`
        }
    });
}

function formatItem(item){
    return item && item.length > ITEM_MAX_LENGTH
        ? item.substr(0, ITEM_MAX_LENGTH) + '...'
        : item;
}

function registerShortcuts(globalShortcut, clipboard, stack)
{
    globalShortcut.unregisterAll();

    stack.forEach((item, i) => {
        globalShortcut.register(`CommandOrControl+Alt+${i+1}`, () => {
            clipboard.writeText(stack[i]);
        });
    });
}

app.on('ready', () => {

    const tray = new Tray(`${__dirname}\\..\\..\\electron.png`);

    let stack = [];
    let clipboardBuffer = [
        {
            label: '<Empty>',
            enabled: false
        }
    ];
    
    let trayMenu = Menu.buildFromTemplate(clipboardBuffer);

    tray.setContextMenu(trayMenu);

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack);
        console.log(stack);

        let stackTemplate = formatMenuTemplateFromStack(stack);
        let newTrayMenu = Menu.buildFromTemplate(stackTemplate);
        tray.setContextMenu(newTrayMenu);

        registerShortcuts(globalShortcut, clipboard, stack);
    });

    mainWindow = new BrowserWindow({
        height: 800,
        width: 800
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
