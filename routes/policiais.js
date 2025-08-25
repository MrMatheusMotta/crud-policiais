const express = require('express');
const router = express.Router();
const policiaisController = require('../controller/policiaisController');

router.post('/', policiaisController.cadastrar);
router.get('/', policiaisController.listar);

module.exports = router;