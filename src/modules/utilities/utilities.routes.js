const express = require('express');
const utilities_controller = require('./utilities_controller');

const router = express.Router();

router.route('/seed-data').post(utilities_controller.seedData);

module.exports = router;
