// getting keys ( privatekey, public key)
const Store = require('electron-store');
const store = new Store();


var e = require('./Encryption');
let enc = new e.Encryption(null, null, '');

const { dialog } = require('electron')
let createAlert = (title, msg) => {
    const options = {
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        title: 'LOGGING INFO',
        message: title,
        detail: msg,
        // checkboxLabel: 'Remember my answer',
        // checkboxChecked: true,
    };
    
    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
        console.log(response);
        console.log(checkboxChecked);
    });
    //
}

module.exports = {
    port : process.env.PORT || 3033,
    mongo_uri : process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notix',
    secret : process.env.SECRET || 'CodingIsCool',
    
    store : store,
    // create an alert
    createAlert,

    // all the auth's needed methods
    privateDecrypt : enc.privateDecrypt,
    privateEncrypt : enc.privateEncrypt,
    checkLogin : enc.checkLogin,
    login : enc.login,
};