"use strict";
var Encryption = /** @class */ (function () {
    function Encryption(sKey, pKey, passphrase) {
        var _this = this;
        this.sKey = null;
        this.pKey = null;
        this.passphrase = '';
        //TODO: !IMPORTANT PROVIDE ENCRYPTION FOR KEYS
        this.createPrivateKey = function (key, userPassword) {
            // see if it decrypts secret key !
            var createPrivateKey = require('crypto').createPrivateKey;
            var sKey = createPrivateKey(key, {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: userPassword,
            });
            console.log(key);
            //TODO : IF PASS IS INCORRECT
            return key;
        };
        this.checkLogin = function () {
            return (_this.sKey !== null && _this.pKey !== null && _this.passphrase !== '');
            // checks basically if we have logged in.
        };
        this.privateEncrypt = function (msg) {
            if (!_this.checkLogin()) {
                return null;
            }
            var _a = require('crypto'), publicEncrypt = _a.publicEncrypt, constants = _a.constants;
            console.log(msg);
            var enc = publicEncrypt({
                key: _this.pKey,
                passphrase: _this.passphrase,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            }, Buffer.from(msg));
            console.log(enc);
            return enc;
        };
        this.privateDecrypt = function (enc) {
            if (!_this.checkLogin()) {
                return null;
            }
            var _a = require('crypto'), privateDecrypt = _a.privateDecrypt, constants = _a.constants;
            var msg = privateDecrypt({
                key: _this.sKey,
                passphrase: _this.passphrase,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
            }, Buffer.from(enc));
            return msg;
        };
        //
        this.pKey = pKey;
        this.sKey = sKey;
        this.passphrase = passphrase;
    }
    Encryption.prototype.login = function (sKey, pKey, passphrase, encPassphrase) {
        // tries to login ! like a brute !
        var crypto = require('crypto');
        var msg;
        try {
            msg = crypto.privateDecrypt({
                key: sKey,
                // type : 'pkcs8',
                // format : 'pem',
                // cipher : 'aes-256-cbc',
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                passphrase: passphrase,
                oaepHash: "sha256",
            }, (encPassphrase));
        }
        catch (e) {
            console.log(e);
            // invalid login
            sKey = null;
            pKey = null;
            passphrase = '';
            return false;
        }
        console.log(msg.toString('utf-8'));
        console.log(encPassphrase);
        if (msg.toString('utf-8') === passphrase) {
            // ''''login''''
            this.pKey = pKey;
            this.sKey = sKey;
            this.passphrase = passphrase;
            return true;
        }
        else {
            // invalid login
            sKey = null;
            pKey = null;
            passphrase = '';
            return false;
        }
    };
    return Encryption;
}());
module.exports = { Encryption: Encryption };
