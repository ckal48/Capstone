const express = require('express');
const router = express.Router();

//Login Page
router.get('/', (req, res) => res.render('socialstudies'));

module.exports = router;