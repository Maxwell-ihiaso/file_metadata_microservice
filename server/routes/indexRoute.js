const express = require('express');
const router = express.Router();
const indexControls = require('../controllers/indexControls');

router.get('/', indexControls);

module.exports = router;