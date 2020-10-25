import React from 'react';

class transaction
{
    sender: number;
    data: string;
    signature: string;
    constructor(sender: number, data : string, signature : string)
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

}

class block
{
    timestamp: any;
    data: any;
    prevHash: any;
    constructor(timestamp, data, prevHash)
    {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

