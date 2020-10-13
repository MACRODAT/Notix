const {app, BrowserWindow  } = require('electron');

function createWindow(){
    // creates the browser win
    let win = new BrowserWindow({width: 800, height: 600});
    // load index.html
    // win.loadFile('src/index.html')
    win.loadURL('http://localhost:3001/')
}

app.on('ready', createWindow);

