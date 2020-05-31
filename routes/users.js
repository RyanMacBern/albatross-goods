var express = require('express');
var router = express.Router();

const { sayHi } = require('../controllers/users.js');

/* GET users listing. */
router.get('/', sayHi);

module.exports = router;
