
const hash = require('object-hash');

// * blockchain backend
// create and manage blockchains using this module 

class transaction
{
    data : string= '';
    sender : number = -1;
    signature : string = '';
    constructor(sender, data , signature)
    {
        this.sender = sender;
        this.data = data;
        this.signature = signature;
    }

    toJson()
    {
        return {
            sender : this.sender,
            data : this.data,
            signature : this.signature,
        }
    }

    fromJson(json)
    {
        let jsonObj = JSON.parse(json);
        this.data = jsonObj.data;
        this.sender = jsonObj.sender;
        this.signature = jsonObj.signature;

    }

    //
    isTransactionValid() 
    {
        // TODO VERIFY SIGNATURE 
        return  this.sender > 0 && this.data.length > 0 && this.signature.length > 0;
    }
}

class block
{
    timestamp: string;
    data: [transaction];
    prevHash: string;
    signature : string;

    constructor(timestamp, data, prevHash, signature)
    {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
        this.signature = signature;
    }

    toJson()
    {
        return {
            timestamp : this.timestamp,
            data : this.data.map(u => u.toJson()),
            prevHash : this.prevHash,
            signature : this.signature,
        }
    }

    computeHash(json_)
    {
        // computes the hash function and returns it to the
        // server
        var json;
        if (json_ !== null)
        {
            // let's take that json for granted
            json = json_;
        }
        else 
        {
            // 
            json = this.toJson();
        }
        // now that we have the json => hash
        const hash_ = hash(json, { algorithm : 'sha256', encoding: 'base64'});
        console.log(hash_);
        return hash_;
    }

    isBlockMature()
    {
        // if computed for => POLICY IS TO BE MATURE
        if (this.isBlockComputed()) return true;

        // TODO IMPROVE FUNCTIONALITY
        // for now, just see if it has a certain number of transactions
        if (this.data.length > 4)
        {
            return true;
        }
        else{
            return false;
        }
    }

    isBlockComputed() : boolean
    {
        var hash_ = this.computeHash(null);
        // verify block's signature
        return (String(hash_).startsWith('00'))
    }

    mine()
    {

    }

    addTransaction(transaction : transaction) : boolean // inserted ?
    {
        // Only if computed for, add code for maturity respectively in your function
        if (transaction.isTransactionValid() && !this.isBlockComputed())
        {
            // verify 
            this.data.push(transaction);
            if (this.isBlockMature())
            {
                //TODO ENGAGE IN SIGNATURE SEARCH ***MINING***
                this.mine();
            }
            return true;
        }
        return false;
    }
}

class blockchain{
    blocks : [block];
    latestHash : string;

    invalidatedBlocks : block; // for now //TODO CREATE AND MANAGE AN ARRAY OF INVALIDATED BLOCKS


    computeLatestHash()
    {
        // TODO FUTURE VERSIONS, SHOULD INCLUDE 
        this.latestHash = this.blocks[-1].computeHash(null);
    }

    constructor(_initBlockchain)
    {
        this.blocks = _initBlockchain;
        if (this.blocks === null)
        {
            // add a first block
            let b : block = new block(Date.now.toString(), [], '', '***FIRST BLOCK SIGNATURE RANDOM***');
            let c : block = new block(Date.now.toString(), [], '', '');
            this.invalidatedBlocks = c;
            this.blocks = [b];
        }
        this.latestHash = '';
        this.computeLatestHash();
        this.invalidatedBlocks = new block(0,null,null,'');
        // load blockchain into memory
    }

    addBlock(block : block) : boolean // whether or not block insertion was performed correctly
    {
        // verifies block for consistence
        let hash_ = block.computeHash(null);
        // this could be the hash of the last blockchain,
        // which SHOULD be the case in this version of the
        // blockchain
        // TODO *IMPORTANT Implement block verification based on PROOF OF WORK
    
        // TODO MAKE SURE THAT BLOCK'S SHA256 ENDS UP WITH X AMOUNT OF ZEROES
        // for now, the first two bits should be zero
        if (!block.isBlockComputed())
        {
            return false;
        }

        // TODO ADD BLOCK WHEN PREV HASH IS CONSISTENT WITH THE HASH OF THE PREV BLOCK'S HASH
        if (block.prevHash !== this.latestHash)
        {
            // the latest hash is incorrect, don't proceed 
            return false;
        }

        // this.invalidatedBlocks = .push(block);
        // TODO IMPLEMENT STACK OF INVALIDATED BLOCKS
        if (this.invalidatedBlocks !== null)
        {
            // don't remove prev block
            return false;
        }
        this.invalidatedBlocks = block;
        
        if (this.invalidatedBlocks.isBlockComputed())
        {
            // move to BLOCKS
            this.blocks.push(this.invalidatedBlocks);
        }

        // recompute latest hash
        this.computeLatestHash();

        // END OF VERITICATION
        return true;
    }

    addTransaction(transaction_ : transaction) : boolean
    {
        // tries to add a transaction to the latest block
        if (this.invalidatedBlocks !== null)
        {
            this.invalidatedBlocks.addTransaction(transaction_);
            return true;
        }
        else{
            this.blocks[-1].addTransaction(transaction_);
            return true;
        }
    }

}


export default {
    transaction,
    block,
    blockchain,
}