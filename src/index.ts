const {app, ipcMain  } = require('electron');
const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = true;

// const express = require('express');
// const mongoose = require('mongodb');
var server = require("../src/server/server");   

var blocAPI = require('../src/server/routes/cryptic/controller');


let win : any;

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
                nodeIntegration: true,
                // enableRemoteModule: true,
            },
        });
    // load index.html
    // win.loadFile('src/index.html')
    // console.log(`file://${path.join(__dirname, '../build/index.html')}`
    win.loadURL(
        isDev ? "http://localhost:3001" : 
            `file://${path.join(__dirname, '../build/index.html')}`)
    win.on("closed", () => (win = new BrowserWindow()));
}

app.on('ready', createWindow);

let doop = async () => {
    return '';
}
ipcMain.on('getApiVersion', async (event : any, arg : any) => {
    // what kind of message ?
    await blocAPI.apiVersion().then((res : any )=> {
        // return version to renderer
        console.log(res);
        if (res === null)
        {
            event.reply('getApiVersionResponse', 'error')
        }
        event.reply('getApiVersionResponse', res);
    })
});

ipcMain.on('pushTransaction', async (event : any, arg : any) => {
    // what kind of message ?
    await blocAPI.createTransaction(arg).then((res : any)=> {
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


