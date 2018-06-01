const mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    title: String,
    cover: String,
    apiId: String,
    description: String,
    rating: String
});

module.exports =  gameSchema