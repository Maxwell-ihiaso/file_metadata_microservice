const express = require('express');
const router = express.Router();
const { 
    upload,
    uploadControls
 } = require('../controllers/apiControls')

router.post('/upload', upload.single('upfile'), uploadControls);

module.exports = router;