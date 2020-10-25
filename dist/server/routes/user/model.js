"use strict";
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // password : {
    //     type: String, //////// not used in blockchain
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    account_created: {
        type: String,
        default: Date.now()
    },
    picture: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'imageModel'
    },
    pKey: {
        type: String,
        required: true,
    },
    sKey: {
        type: String,
        required: true,
    },
    encPassphrase: {
        type: Buffer,
        required: true,
    },
});
var ImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    data: {
        type: Buffer
    }
});
var localSchema = mongoose.Schema({
    tag: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'A little name for your place ? What about heaven ?']
    },
    picture: {
        type: mongoose.SchemaTypes.ObjectId,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: String,
        default: "",
        required: [function () {
                return this.picture > 0;
            }, 'No, a picture and a thousand words !']
    },
    type: {
        type: String,
        enum: ['Fixed', 'Carriable']
    }
});
var itemSchema = mongoose.Schema({
    tag: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999,
        unique: true,
        default: function () {
            n = 0;
            while (n > 10000 || n < 1000) {
                n = Math.floor(Math.random() * 10000);
            }
            return n;
        }
    },
    name: {
        type: String,
        required: [true, 'A little name for your item ?']
    },
    picture: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'imageModel'
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: String,
        default: "",
        required: [function () {
                return this.picture > 0;
            }, 'No, a picture and a thousand words !']
    },
    type: {
        type: String,
        enum: ['Fixed', 'Carriable'],
        default: 'Carriable'
    },
    organisation: {
        type: String,
        default: 'UND'
    },
    category: {
        type: String,
        default: 'General Purpose'
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    console.log(user.isModified('password'));
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//     if (candidatePassword == this.password){
//         // if (err) return cb(err);
//         cb(null, true);
//     }
//     cb('error', false);
// }
itemSchema.methods.compareTags = function (candidateTag, cb) {
    return (this.tag == candidateTag);
};
var userModel = mongoose.model('user', userSchema);
var imageModel = mongoose.model('image', ImageSchema);
var localModel = mongoose.model('local', localSchema);
var itemModel = mongoose.model('item', itemSchema);
module.exports = { userModel: userModel, localModel: localModel, itemModel: itemModel, imageModel: imageModel };
