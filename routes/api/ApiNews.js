var express = require('express');
var router = express.Router();
var ApiNews = require('../../models/ApiNews');
var newsCtrl = require('../../controllers/users');

router.get('/news', function(req, res){
    res.json({psNews: []})
})


module.exports = router