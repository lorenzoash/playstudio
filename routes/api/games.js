const express = require('express');
const router = express.Router();
const gamesController = require('./../../controllers/games');

router.get('/favorite/:apiId', gamesController.favorite);

module.exports = router;