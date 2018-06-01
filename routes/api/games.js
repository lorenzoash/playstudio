const express = require('express');
const router = express.Router();
const gamesController = require('./../../controllers/games');

router.post('/favorites', gamesController.addToFavorites);

module.exports = router;