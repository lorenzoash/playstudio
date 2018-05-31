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
        fields: 'id,name,popularity,rating,aggregated_rating,cover',
        filters: {
            'release_dates.date-gt': '2017-12-31',    
        },
        limit: 25,
        order: 'popularity:desc',
        platform: 'playstation 4'
        
    }).then(data => {
        console.log(data);
        
        // for (let key in data.body) {
        //     let currGame = data.body[key];
        //     let cloudinary_id = currGame.screenshots[0].cloudinary_id;
        //     currGame.firstScreenshot =  client.image({ cloudinary_id: cloudinary_id } , 'screenshot_med', 'jpg' );

        // } 
        res.json(data.body);
    }).catch(error => {
        throw error;
    });
});

router.get('/reviews', function(req,res) {
    client.reviews({
        fields: '*',
        limit: 25
    }).then(data => {
        res.json(data.body);
    }).catch(error => {
        throw error;
    });
});


module.exports = router