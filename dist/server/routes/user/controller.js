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
var mongoose = require('mongoose');
var model = require('./model');
var jwt = require('jsonwebtoken');
var config = require('./../../config');
var state = require('./../../state/state');
var salter = function () {
    var n = 0;
    while (n > 10000 || n < 1000) {
        n = parseInt(Math.random() * 10000);
    }
    return n;
};
module.exports = {
    login: function (req, res) {
        model.userModel.findOne({ name: req.body.name }, function (err, user) {
            if (err)
                throw err;
            if (user == null) {
                console.log('no username');
                res.status(430).send({ msg: 'No username / password match.' });
                return;
            }
            //
            if (!config.login(user.sKey, user.pKey, req.body.password, user.encPassphrase)) {
                // unsuccessful login
                res.status(430).send({ msg: 'No username / password match.' });
            }
            else {
                // already logged in
                res.status(200).send({ msg: 'Login Success', name: user.name, expiresIn: 86400 });
            }
        });
    },
    logout: function (req, res) {
        // logout from the current session 
        // JUST REMOVE THE CONFIG KEYS
        config.pKey = null;
        config.sKey = null;
        res.status(200).send({});
    },
    isUsernameTaken: function (req, res) {
        model.userModel.findOne({ name: req.body.name }, function (err, user) {
            res.status(200).send({ exist: (user != null) });
        });
    },
    register: function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.body.picture)) {
            req.body.picture = mongoose.Types.ObjectId();
        }
        var crypt = require('crypto');
        // set up encryption
        var _a = crypt.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: req.body.password,
            }
        }), publicKey = _a.publicKey, privateKey = _a.privateKey;
        var e = require('../../config/Encryption');
        var fakeLogin = new e.Encryption(privateKey, publicKey, req.body.password);
        var encPass = '';
        if (fakeLogin.checkLogin) {
            // basic check
            encPass = fakeLogin.privateEncrypt(req.body.password);
            if (!fakeLogin.login(privateKey, publicKey, req.body.password, encPass)) {
                // problem in encryption
                res.status(500).send({ msg: 'critical bug' });
            }
        }
        else {
            res.status(500).send({ msg: 'Critical server error.' });
        }
        // YOU CAN HAVE ALL THE CONFIDENCE IN THE WORLD THAT
        // THE ACCOUNT HAS BEEN SET UP CORRECTLY
        var newUser = new model.userModel({
            name: req.body.name,
            // picture : req.body.picture,
            email: req.body.email,
            // password : req.body.password,
            account_created: req.body.account_created,
            pKey: publicKey,
            sKey: privateKey,
            encPassphrase: encPass,
        });
        newUser.save().then(function (result) {
            // console.log(result);
            res.status(200).send({ msg: 'Register Successful', user_id: res._id });
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({ msg: 'Register unsuccessful. Received data is : \n' + req.body.forename });
        });
    },
    getAllDifferentCategories: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // FIND ALL PREVIOUSLY USED CATEGORIES BUT NO DUPLICATES
            model.itemModel.find({}, function (err, items) {
                if (err) {
                    res.status(500).send({ categories: null });
                    return;
                }
                var categories = [];
                items.forEach(function (item) {
                    if (item.category.toString().trim() !== "") {
                        // add that item
                        if (categories.filter(function (c) { return c.category === item.category; }).length === 0) {
                            // no prev cat recorded 
                            categories.push(item.category);
                        }
                        // categories.push(categories.filter(c => c.category === item.category).length)
                    }
                    else {
                        // categories.push("empty")
                    }
                });
                res.status(200).send({ categories: categories });
                return;
            });
            return [2 /*return*/];
        });
    }); },
    requestTag: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var res_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTag = salter();
                    cont = true;
                    _a.label = 1;
                case 1:
                    if (!cont) return [3 /*break*/, 3];
                    return [4 /*yield*/, model.itemModel.find({ tag: newTag })];
                case 2:
                    res_1 = _a.sent();
                    if ((res_1.length) == 0) {
                        cont = false;
                    }
                    else {
                        newTag = salter();
                    }
                    return [3 /*break*/, 1];
                case 3:
                    res.status(200).send({ tag: newTag });
                    return [2 /*return*/];
            }
        });
    }); },
    totalEntities: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); },
    createItem: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var res_2, newItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // if (! req.body.picture.match(/^[0-9a-fA-F]{24}$/))
                    if (!mongoose.Types.ObjectId.isValid(req.body.picture)) {
                        req.body.picture = mongoose.Types.ObjectId();
                    }
                    if (req.body.type == "") {
                        req.body.type = "Carriable";
                    }
                    // should we create a tag?
                    // req.body.tag = 1111;
                    if (req.body.tag == "") {
                        req.body.tag = 1111;
                    }
                    cont = true;
                    newTag = req.body.tag;
                    _a.label = 1;
                case 1:
                    if (!cont) return [3 /*break*/, 3];
                    return [4 /*yield*/, model.itemModel.find({ tag: newTag })];
                case 2:
                    res_2 = _a.sent();
                    if ((res_2.length) == 0) {
                        cont = false;
                    }
                    else {
                        newTag = salter();
                    }
                    return [3 /*break*/, 1];
                case 3:
                    newItem = new model.itemModel({
                        tag: newTag,
                        name: req.body.name,
                        // picture : req.body.picture,
                        category: req.body.category,
                        organisation: req.body.organisation,
                        comments: req.body.comments,
                        type: req.body.type,
                    });
                    if (req.body.dateAdded != "" && req.body.dateAdded != null && Date.parse(req.body.dateAdded) > 0) {
                        newItem.dateAdded = req.body.dateAdded;
                        console.log("added date !");
                    }
                    newItem.save().then(function (result) {
                        console.log(result);
                        res.status(200).send({ msg: "Success" });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).send({ msg: 'Register unsuccessful for : \n' + req.body.name });
                    });
                    return [2 /*return*/];
            }
        });
    }); }
};
