const User = require('../models/user');
require('dotenv').config();
const igdb = require('igdb-api-node').default;
const client = igdb('8d754e87b3feaeee120888e0d46bc03d');

function favorite(req, res) {
    client.games({
        fields: 'id,name,rating,aggregated_rating,cover,description', 
        ids: [parseInt(req.params.apiId)]
    })
    .then(data => {
        // Find user and add game to favorites
        // 1. How do we find user?
        User.findOne(req.user, function(err, user) {
            user.favorites.push({fields,ids})
        })
        // TODO: Add game to users favorites list
        // console.log(data);
    })
    .catch(err => console.log(err));
    
}

favorite()
function games(req, res){
    getApiData('games', function(err, res, body) {
        if (err) return res.status(401).json(err)
        res.status(200).json(body)
    })
}

