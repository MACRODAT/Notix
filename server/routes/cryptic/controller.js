const mongoose = require('mongoose');
const models = require('./model');
const axios = require('axios');

module.exports = {
    getAllMessages : (req, res) => {
        //  return all the messages contained in the blockchain !
        var messages = models.blockModel.find({}, (err, items) => {
            if (err){
                res.status(500).send({items : null});
            }
            // all messages
            res.status(200).send({ items : items });
        });
    },
    

    // API STUFF
    apiVersion : async () => {
        // returns the version of the factom API
        const headers = {
            'app_id' : '2814cb97',
            'app_key' : 'fe5beda3e4693668e02919f5e9ee5d82',
        }
        let config = {
            headers : headers,
        }
        let response;
        try{
            //
            response = await axios.get('https://ephemeral.api.factom.com/v1/', config)
        }catch{
            response = null;
            return null;
        }

        return response.data.version;
        
    }
}