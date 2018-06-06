var express = require('express');
var router = express.Router();
var request = require('request');
var API_KEY = process.env.KEY;
var igdb = require('igdb-api-node').default;
var client = igdb(process.env.IGBD_API_KEY);

router.get('/', function(req, res){
    request(`https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${API_KEY}`, function(err, response, body) {
        res.json(JSON.parse(body).articles);
    });
});


router.get('/games', function(req, res){
    client.games({
        fields: 'id,platforms,name,popularity,aggregated_rating,cover,summary',
        filters: {
            'release_dates.date-gt': '2017-01-01',    
        },
        limit: 25,
        order: 'popularity:desc'
    }).then(data => {
        console.log(data);
        
     
        res.json(data.body);
    }).catch(error => {
        console.log(error);
        res.json({err: error});
    });
});




module.exports = router