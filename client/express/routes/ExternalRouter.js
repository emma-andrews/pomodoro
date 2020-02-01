const externalController = require('../controllers/ExternalController');
const express = require('express');
const router = new express.Router();

// Path is /external/blah
router.route('/blah').get(externalController.blah);

module.exports = router;
