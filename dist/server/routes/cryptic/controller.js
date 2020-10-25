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
var models = require('./model');
var axios = require('axios');
var _a = require('../../blockchain/main.ts'), transaction = _a.transaction, block = _a.block, blockchain = _a.blockchain;
var myBlockchain = new blockchain();
module.exports = {
    getAllMessages: function (req, res) {
        //  return all the messages contained in the blockchain !
        var messages = models.blockModel.find({}, function (err, items) {
            if (err) {
                res.status(500).send({ items: null });
            }
            // all messages
            res.status(200).send({ items: items });
        });
    },
    // API STUFF
    apiVersion: function () { return __awaiter(void 0, void 0, void 0, function () {
        var headers, config, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    headers = {
                        'app_id': '2814cb97',
                        'app_key': 'fe5beda3e4693668e02919f5e9ee5d82',
                    };
                    config = {
                        headers: headers,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get('https://ephemeral.api.factom.com/v1/', config)];
                case 2:
                    //
                    response = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    response = null;
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/, response.data.version]; // API VERSION FOR  CERTIFICATE VERIFICATION
            }
        });
    }); },
    // create a transaction
    createTransaction: function (transaction) {
        // boolean return value
        return myBlockchain.addtransaction(transaction);
    }
};
