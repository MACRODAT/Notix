"use strict";
exports.__esModule = true;
var hash = require('object-hash');
// * blockchain backend
// create and manage blockchains using this module 
var transaction = /** @class */ (function () {
    function transaction(sender, data, signature) {
        this.data = '';
        this.sender = -1;
        this.signature = '';
        this.sender = sender;
        this.data = data;
        this.signature = signature;
    }
    transaction.prototype.toJson = function () {
        return {
            sender: this.sender,
            data: this.data,
            signature: this.signature
        };
    };
    transaction.prototype.fromJson = function (json) {
        var jsonObj = JSON.parse(json);
        this.data = jsonObj.data;
        this.sender = jsonObj.sender;
        this.signature = jsonObj.signature;
    };
    //
    transaction.prototype.isTransactionValid = function () {
        // TODO VERIFY SIGNATURE 
        return this.sender > 0 && this.data.length > 0 && this.signature.length > 0;
    };
    return transaction;
}());
var block = /** @class */ (function () {
    function block(timestamp, data, prevHash, signature) {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
        this.signature = signature;
    }
    block.prototype.toJson = function () {
        return {
            timestamp: this.timestamp,
            data: this.data.map(function (u) { return u.toJson(); }),
            prevHash: this.prevHash,
            signature: this.signature
        };
    };
    block.prototype.computeHash = function (json_) {
        // computes the hash function and returns it to the
        // server
        var json;
        if (json_ !== null) {
            // let's take that json for granted
            json = json_;
        }
        else {
            // 
            json = this.toJson();
        }
        // now that we have the json => hash
        var hash_ = hash(json, { algorithm: 'sha256', encoding: 'base64' });
        console.log(hash_);
        return hash_;
    };
    block.prototype.isBlockMature = function () {
        // if computed for => POLICY IS TO BE MATURE
        if (this.isBlockComputed())
            return true;
        // TODO IMPROVE FUNCTIONALITY
        // for now, just see if it has a certain number of transactions
        if (this.data.length > 4) {
            return true;
        }
        else {
            return false;
        }
    };
    block.prototype.isBlockComputed = function () {
        var hash_ = this.computeHash(null);
        // verify block's signature
        return (String(hash_).startsWith('00'));
    };
    block.prototype.mine = function () {
    };
    block.prototype.addTransaction = function (transaction) {
        // Only if computed for, add code for maturity respectively in your function
        if (transaction.isTransactionValid() && !this.isBlockComputed()) {
            // verify 
            this.data.push(transaction);
            if (this.isBlockMature()) {
                //TODO ENGAGE IN SIGNATURE SEARCH ***MINING***
                this.mine();
            }
            return true;
        }
        return false;
    };
    return block;
}());
var blockchain = /** @class */ (function () {
    function blockchain(_initBlockchain) {
        this.blocks = _initBlockchain;
        if (this.blocks === null) {
            // add a first block
            var b = new block(Date.now.toString(), [], '', '***FIRST BLOCK SIGNATURE RANDOM***');
            var c = new block(Date.now.toString(), [], '', '');
            this.invalidatedBlocks = c;
            this.blocks = [b];
        }
        this.latestHash = '';
        this.computeLatestHash();
        this.invalidatedBlocks = new block(0, null, null, '');
        // load blockchain into memory
    }
    blockchain.prototype.computeLatestHash = function () {
        // TODO FUTURE VERSIONS, SHOULD INCLUDE 
        this.latestHash = this.blocks[-1].computeHash(null);
    };
    blockchain.prototype.addBlock = function (block) {
        // verifies block for consistence
        var hash_ = block.computeHash(null);
        // this could be the hash of the last blockchain,
        // which SHOULD be the case in this version of the
        // blockchain
        // TODO *IMPORTANT Implement block verification based on PROOF OF WORK
        // TODO MAKE SURE THAT BLOCK'S SHA256 ENDS UP WITH X AMOUNT OF ZEROES
        // for now, the first two bits should be zero
        if (!block.isBlockComputed()) {
            return false;
        }
        // TODO ADD BLOCK WHEN PREV HASH IS CONSISTENT WITH THE HASH OF THE PREV BLOCK'S HASH
        if (block.prevHash !== this.latestHash) {
            // the latest hash is incorrect, don't proceed 
            return false;
        }
        // this.invalidatedBlocks = .push(block);
        // TODO IMPLEMENT STACK OF INVALIDATED BLOCKS
        if (this.invalidatedBlocks !== null) {
            // don't remove prev block
            return false;
        }
        this.invalidatedBlocks = block;
        if (this.invalidatedBlocks.isBlockComputed()) {
            // move to BLOCKS
            this.blocks.push(this.invalidatedBlocks);
        }
        // recompute latest hash
        this.computeLatestHash();
        // END OF VERITICATION
        return true;
    };
    blockchain.prototype.addTransaction = function (transaction_) {
        // tries to add a transaction to the latest block
        if (this.invalidatedBlocks !== null) {
            this.invalidatedBlocks.addTransaction(transaction_);
            return true;
        }
        else {
            this.blocks[-1].addTransaction(transaction_);
            return true;
        }
    };
    return blockchain;
}());
exports["default"] = {
    transaction: transaction,
    block: block,
    blockchain: blockchain
};
