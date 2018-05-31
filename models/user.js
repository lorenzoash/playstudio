var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;
const Game = require('./game.js')

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, require: true, lowercase: true, unique: true},
    password: String,
    favorites: [Game]
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb)
};

module.exports = mongoose.model('User', userSchema)