module.exports = {
    port : process.env.PORT || 3033,
    mongo_uri : process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/instamac',
    secret : process.env.SECRET || 'CodingIsCool',
    privateKey : 'HelloWorld',
    privateKeyRefresh : 'HelloWorld2',

}