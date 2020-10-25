"use strict";
var router = require('express').Router();
var controller = require('./controller');
var verify = require('../../middleware/auth');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/login', jsonParser, controller.login);
router.post('/logout', jsonParser, controller.logout);
router.post('/itemize', verify, jsonParser, controller.createItem);
router.post('/register', jsonParser, controller.register);
router.post('/isUsernameTaken', jsonParser, controller.isUsernameTaken);
router.post('/requestTag', verify, jsonParser, controller.requestTag);
router.post('/getcategories', verify, jsonParser, controller.getAllDifferentCategories);
module.exports = router;
