var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var userCtrl = require('../../controllers/users');

router.get('/news', function(req, res){
    res.json({psNews: []})
})

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router