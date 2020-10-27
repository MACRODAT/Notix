const mongoose = require('mongoose');
const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const state = require('./../../state/state');

let salter = function() {
    let n = 0;
    while (n  > 10000 || n < 1000)
    {
       n = parseInt( Math.random() * 10000 );
    }
    return n;
}

module.exports = {
    login: (req, res) => {
        model.userModel.findOne({name : req.body.name} , (err, user) => {
            if (err) throw err;
            
            if (user == null){
                console.log('no username');
                res.status(430).send({msg: 'No username / password match.'});
                return; 
            }
            //
            if (!config.login(user.sKey, user.pKey, req.body.password, user.encPassphrase))
            {
                // unsuccessful login
                res.status(430).send({msg: 'No username / password match.'});
            }
            else {
                // already logged in
                res.status(200).send({msg : 'Login Success', name : user.name, expiresIn : 86400});
            }
        })

    },
    logout: (req, res) => {
        // logout from the current session 
        // JUST REMOVE THE CONFIG KEYS
        config.pKey = null;
        config.sKey = null;
        res.status(200).send({});
    },
    isUsernameTaken : (req, res) => {
        model.userModel.findOne({name : req.body.name }, (err, user) => {
            res.status(200).send({exist : (user != null)})
        })
    },
    register : (req, res) =>{

        if (! mongoose.Types.ObjectId.isValid(req.body.picture))
        {
            req.body.picture = mongoose.Types.ObjectId();
        }

        let crypt = require('crypto');

        // set up encryption
        let  { publicKey, privateKey }  = crypt.generateKeyPairSync('rsa', {
            modulusLength : 2048,
            publicKeyEncoding : {
                type : 'spki',
                format : 'pem',
            },
            privateKeyEncoding : {
                type : 'pkcs1',
                format : 'pem',
                cipher : 'aes-256-cbc',
                passphrase : req.body.password,
            }
        });

        var e = require('../../config/Encryption');
        let fakeLogin = new e.Encryption(privateKey, publicKey, req.body.password);
        let encPass = '';
        if (fakeLogin.checkLogin)
        {
            // basic check
            encPass = fakeLogin.privateEncrypt(req.body.password);
            if (! fakeLogin.login(privateKey, publicKey, req.body.password, encPass))
            {
                // problem in encryption
                res.status(500).send({msg : 'critical bug'});
            }
        }  
        else{
            res.status(500).send({msg : 'Critical server error.'});
        }

        // YOU CAN HAVE ALL THE CONFIDENCE IN THE WORLD THAT
        // THE ACCOUNT HAS BEEN SET UP CORRECTLY

        let newUser = new model.userModel ( {
            name : req.body.name,
            // picture : req.body.picture,
            email : req.body.email,
            // password : req.body.password,
            account_created : req.body.account_created,
            pKey : publicKey,
            sKey : privateKey, //TODO FIND A MORE SECURE METHOD
            encPassphrase : encPass,
        });

        

        newUser.save().then((result) => {
            // console.log(result);
            res.status(200).send({msg : 'Register Successful', user_id : res._id});
        })
        .catch((err) => {
            console.log(err);
            
            res.status(500).send({msg : 'Register unsuccessful. Received data is : \n' + req.body.forename});
        });
    },

    getAllDifferentCategories : async(req, res) => {
        // FIND ALL PREVIOUSLY USED CATEGORIES BUT NO DUPLICATES
        model.itemModel.find({}, (err, items ) => {
            if (err){
                res.status(500).send({ categories : null });
                return;
            }
            var categories = [];
            items.forEach(item => {
                if (item.category.toString().trim() !== ""){
                    // add that item
                    if (categories.filter(c => c.category === item.category).length === 0)
                    {
                        // no prev cat recorded 
                        categories.push(item.category);
                    }
                    // categories.push(categories.filter(c => c.category === item.category).length)
                }
                else{
                    // categories.push("empty")
                }
            });
            res.status(200).send({ categories : categories });
            return;
        });
        // res.status(500).send({ categories : null });
    },

    requestTag : async(req, res) => {
        let cont;
        let newTag;
        newTag = salter();
        cont = true;
        while(cont)
        {
            // yes, we do !x
            const res = await model.itemModel.find({ tag : newTag });

            if ((res.length) == 0)
            {
                    cont = false;
            }else{
                    newTag = salter();
            }
        }
        res.status(200).send({tag : newTag});
    },
    totalEntities : async(req, res) => {
        // finds out the number of visible
        // entities to a specific organisation
    },
    createItem : async (req, res) => {
        // if (! req.body.picture.match(/^[0-9a-fA-F]{24}$/))
        if (! mongoose.Types.ObjectId.isValid(req.body.picture))
        {
            req.body.picture = mongoose.Types.ObjectId();
        }

        if (req.body.type == "")
        {
            req.body.type = "Carriable";
        }  
        let cont;
        let newTag;

        // should we create a tag?
        // req.body.tag = 1111;
        if (req.body.tag == "")
        {
            req.body.tag = 1111;
        }
        cont = true;
        newTag = req.body.tag;
        while(cont)
        {
            // yes, we do !x
            const res = await model.itemModel.find({ tag : newTag });

            if ((res.length) == 0)
            {
                    cont = false;
            }else{
                    newTag = salter();
            }
        }

        let newItem = new model.itemModel ({
            tag : newTag,
            name : req.body.name,
            // picture : req.body.picture,
            category : req.body.category,
            organisation : req.body.organisation,
            comments : req.body.comments,
            type : req.body.type,
        });

        if (req.body.dateAdded != ""  && req.body.dateAdded != null && Date.parse(req.body.dateAdded) > 0) 
        {
            newItem.dateAdded = req.body.dateAdded;
            console.log("added date !");
        }



        newItem.save().then ( result => {
            console.log(result);
            res.status(200).send({msg : "Success"});
        }).catch((err) => {
            console.log(err);
            
            res.status(500).send({msg : 'Register unsuccessful for : \n' + req.body.name});
        });
    }
}