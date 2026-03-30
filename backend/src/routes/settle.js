const express = require('express');
const router = express.Router();
const settleController = require('../controllers/settleController');

router.post('/', settleController.settle);

module.exports = router;