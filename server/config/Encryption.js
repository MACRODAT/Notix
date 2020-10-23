class Encryption{
    sKey = null; 
    pKey = null;
    passphrase = '';

    constructor(sKey, pKey, passphrase )
    {
        //
        this.pKey = pKey;
        this.sKey = sKey;
        this.passphrase = passphrase;
    }

    login(sKey, pKey, passphrase, encPassphrase )
    {
        // tries to login ! like a brute !
        
        const crypto =  require('crypto');
        let msg;
        try {
            msg = crypto.privateDecrypt({
                key : sKey,
                // type : 'pkcs8',
                // format : 'pem',
                // cipher : 'aes-256-cbc',
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                passphrase : passphrase,
                oaepHash: "sha256",
            }, (encPassphrase));
        }
        catch(e){
            console.log(e);
            // invalid login
            sKey = null; 
            pKey = null;
            passphrase = '';
            return false;
        }
        console.log(msg.toString('utf-8'));
        console.log(encPassphrase);
        if (msg.toString('utf-8') === passphrase)
        {
            // ''''login''''
            this.pKey = pKey;
            this.sKey = sKey;
            this.passphrase = passphrase;
            return true;
        }
        else{
            // invalid login
            sKey = null; 
            pKey = null;
            passphrase = '';
            return false;
        }
    }

    //TODO: !IMPORTANT PROVIDE ENCRYPTION FOR KEYS
    createPrivateKey = (key, userPassword) =>{
        // see if it decrypts secret key !
        const { createPrivateKey } = require('crypto');
        let sKey = createPrivateKey(key , {
            type : 'pkcs8',
            format : 'pem',
            cipher : 'aes-256-cbc',
            passphrase : userPassword,
        });
        console.log(key);
        //TODO : IF PASS IS INCORRECT
        return key;
    }

    checkLogin = () => {
        return (this.sKey !== null && this.pKey !== null && this.passphrase !== '')
        // checks basically if we have logged in.
    }

    privateEncrypt = (msg) => {
        if (!this.checkLogin())
        {
            return null;
        }
        const { publicEncrypt, constants } = require('crypto');
        console.log(msg);
        let enc = publicEncrypt({
            key : this.pKey,
            passphrase : this.passphrase,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
		    oaepHash: "sha256",
            // encoding : 'UTF-8',
        }, Buffer.from(msg));
        console.log(enc);
        return enc;
    };

    privateDecrypt = (enc) => {
        if (!this.checkLogin())
        {
            return null;
        }
        const { privateDecrypt, constants } = require('crypto');
        let msg = privateDecrypt({
            key : this.sKey,
            passphrase : this.passphrase,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
        }, Buffer.from(enc));
        return msg;
    };
}

module.exports = {Encryption};