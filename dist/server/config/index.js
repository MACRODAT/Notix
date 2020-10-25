"use strict";
// getting keys ( privatekey, public key)
var Store = require('electron-store');
var store = new Store();
var e = require('./Encryption');
var enc = new e.Encryption(null, null, '');
var dialog = require('electron').dialog;
var createAlert = function (title, msg) {
    var options = {
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        title: 'LOGGING INFO',
        message: title,
        detail: msg,
    };
    dialog.showMessageBox(null, options, function (response, checkboxChecked) {
        console.log(response);
        console.log(checkboxChecked);
    });
    //
};
module.exports = {
    port: process.env.PORT || 3033,
    mongo_uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notix',
    secret: process.env.SECRET || 'CodingIsCool',
    store: store,
    // create an alert
    createAlert: createAlert,
    // all the auth's needed methods
    privateDecrypt: enc.privateDecrypt,
    privateEncrypt: enc.privateEncrypt,
    checkLogin: enc.checkLogin,
    login: enc.login,
};
