const internalController = require('../controllers/InternalController');
const express = require('express');
const router = new express.Router();

// Path is /internal/spotify_auth
router.route('/spotify_auth').get(internalController.spotifyAuth);

// Path is /internal/spotify_callback
router.route('/spotify_callback').get(internalController.spotifyCallback);

// Path is /internal/spotify_refresh_token
router
  .route('/spotify_refresh_token')
  .get(internalController.spotifyRefreshToken);

module.exports = router;
