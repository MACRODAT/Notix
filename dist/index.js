"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('electron'), app = _a.app, ipcMain = _a.ipcMain;
var BrowserWindow = require('electron').BrowserWindow;
var path = require('path');
var isDev = true;
// const express = require('express');
// const mongoose = require('mongodb');
var server = require("../src/server/server");
var blocAPI = require('../src/server/routes/cryptic/controller');
var win;
function createWindow() {
    // Node JS back server
    // creates the browser win
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        minWidth: 700,
        minHeight: 600,
        maximizable: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // load index.html
    // win.loadFile('src/index.html')
    // console.log(`file://${path.join(__dirname, '../build/index.html')}`
    win.loadURL(isDev ? "http://localhost:3001" :
        "file://" + path.join(__dirname, '../build/index.html'));
    win.on("closed", function () { return (win = new BrowserWindow()); });
}
app.on('ready', createWindow);
var doop = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ''];
    });
}); };
ipcMain.on('getApiVersion', function (event, arg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // what kind of message ?
            return [4 /*yield*/, blocAPI.apiVersion().then(function (res) {
                    // return version to renderer
                    console.log(res);
                    if (res === null) {
                        event.reply('getApiVersionResponse', 'error');
                    }
                    event.reply('getApiVersionResponse', res);
                })];
            case 1:
                // what kind of message ?
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ipcMain.on('pushTransaction', function (event, arg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // what kind of message ?
            return [4 /*yield*/, blocAPI.createTransaction(arg).then(function (res) {
                    // return version to renderer
                    console.log(res);
                    // if (res === null)
                    // {
                    //     event.reply('getApiVersionResponse', 'error')
                    // }
                    // event.reply('getApiVersionResponse', res);
                })];
            case 1:
                // what kind of message ?
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
