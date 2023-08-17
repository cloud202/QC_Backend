const express = require('express');
const { template } = require('../controller/template');
const router = express.Router()

router.route('/template').post(template)

module.exports = router;