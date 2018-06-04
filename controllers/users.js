var User = require('../models/user');
var jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login,
    getFavs
}

function login(req, res) {
    User.findOne({email: req.body.email}).exec().then(user => {
        if (!user) return res.status(401).json({err: 'Incorrect Login'})
        user.comparePassword(req.body.pw, (err, isMatch) => {
            if (isMatch) {
                res.json({token: createJWT(user)});
            } else {
                return res.status(401).json({err: 'Incorrect login'})
            }
        });
    }).catch(err => res.status(401).json(err))
}

function signup(req, res) {
    var user = new User(req.body);
    console.log(user)
    user.save(function(err,user) {
        res.json({token: createJWT(user)});
    });
}

function getFavs(req, res) {
    User.findById(req.user._id).then(user => {
        res.json(user.favorites);
    });
}

function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24h'}
    );
}