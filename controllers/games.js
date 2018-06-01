const User = require('../models/user');
const igdb = require('igdb-api-node').default;
const client = igdb(process.env.IGDB_API_KEY);

function addToFavorites(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.favorites.push(req.body);
        user.save(function(err, user){
            res.json(user)
        });
    });
}

function games(req, res){
    getApiData('games', function(err, res, body) {
        if (err) return res.status(401).json(err)
        res.status(200).json(body)
    })
}

module.exports = {
    addToFavorites, 
    games
}
