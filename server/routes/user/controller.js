const mongoose = require('mongoose');
const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const state = require('./../../state/state');

salter = function() {
    n = 0;
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

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                //
                if (isMatch){
                    // let token = jwt.sign({id : user._id},  config.secret, {expiresIn: 86400});
                    
                    // Tokens used for access !
                    let accessToken = jwt.sign({id : user._id}, config.privateKey, {
                        algorithm: 'HS256',
                        expiresIn: 86400
                    });

                    let refreshToken = jwt.sign({id : user._id}, config.privateKeyRefresh, {
                        algorithm: 'HS256',
                        expiresIn: 86400
                    });

                    // add this user to the table of active users
                    state.loggedUsersTable.push(new state.userT('', user._id, -1, refreshToken));

                    res.cookie("jwt", accessToken, {
                        secure : true,
                        httpOnly : true,
                    });

                    res.status(200).send({msg : 'Login Success', name : user.name, expiresIn : 86400});
                } else{  
                    
                    console.log("wrong pass")
                     res.status(430).send({msg: 'No username / password match.'});
                }
            } );
        })

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


        let newUser = new model.userModel ( {
            name : req.body.name,
            // picture : req.body.picture,
            email : req.body.email,
            password : req.body.password,
            account_created : req.body.account_created,
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