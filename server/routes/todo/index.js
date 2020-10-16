const router = require('express').Router();

const controller = require('./controller');
const verify = require('../../middleware/auth');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedparser = bodyParser.urlencoded({extended : false});

router.post('/save', jsonParser, controller.save);
router.get('/get', jsonParser, controller.getAll);

module.exports = router;