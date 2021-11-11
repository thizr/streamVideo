const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video');

router.get('/', videoController.stream);
router.get('/video', videoController.videStream);

module.exports = router;
