var mongoose = require('mongoose');



var newSchema = new mongoose.Schema({
    author: String,
    description: String,
    urlToImage: String
}, {
    timestamps: true
});

module.exports = mongoose.model('News', newSchema);