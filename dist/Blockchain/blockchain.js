"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction = /** @class */ (function () {
    function transaction(sender, data, signature) {
        this.sender = sender;
        this.data = data;
        this.signature = signature;
    }
    transaction.prototype.toJson = function () {
        return {
            sender: this.sender,
            data: this.data,
            signature: this.signature,
        };
    };
    transaction.prototype.fromJson = function (json) {
        var jsonObj = JSON.parse(json);
        this.data = jsonObj.data;
        this.sender = jsonObj.sender;
        this.signature = jsonObj.signature;
    };
    return transaction;
}());
var block = /** @class */ (function () {
    function block(timestamp, data, prevHash) {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    return block;
}());
