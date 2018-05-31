const mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    apiId: String,
    description: String,
    rating: String
});

module.exports = gameSchema