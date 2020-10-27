
const {app, ipcMain  } = require('electron');
const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = true;

// const express = require('express');
// const mongoose = require('mongodb');
var server = require("./server/server");   

var blocAPI = require('./server/routes/cryptic/controller');


let win;

function createWindow(){
    // Node JS back server
    
    // creates the browser win
    let win = new BrowserWindow(
        {
            width: 800,
            height: 600,
            frame: false,
            minWidth: 700,
            minHeight: 600, 
            maximizable: true,
            webPreferences: {
                nodeIntegration: false,
                preload: path.resolve(__dirname, './preload.js')
                // enableRemoteModule: true,
            },
        });
    // load index.html
    // win.loadFile('src/index.html')
    // console.log(`file://${path.join(__dirname, '../build/index.html')}`
    win.loadURL(
        isDev ? "http://localhost:3001" : 
            `file://${path.join(__dirname, '../build/index.html')}`)
    win.on("closed", () => (win = null));
}

app.on('ready', createWindow);

let doop = async () => {
    return '';
}
ipcMain.on('getApiVersion', async (event, arg) => {
    // what kind of message ?
    await blocAPI.apiVersion().then(res => {
        // return version to renderer
        console.log(res);
        if (res === null)
        {
            event.reply('getApiVersionResponse', 'error')
        }
        event.reply('getApiVersionResponse', res);
    })
});

ipcMain.on('pushTransaction', async (event, arg) => {
    // what kind of message ?
    await blocAPI.createTransaction(arg).then(res => {
        // return version to renderer
        console.log(res);
        // if (res === null)
        // {
        //     event.reply('getApiVersionResponse', 'error')
        // }
        // event.reply('getApiVersionResponse', res);
    })
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
app.on('activate', function () {
    if (win === null) {
      createWindow();
    }
});

type PUSH_TRANSACTION = 'push_transaction';

exports.foo = 'foo';
// not updated