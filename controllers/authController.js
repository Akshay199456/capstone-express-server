const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.get('/', async(req, res) => {
	res.status(400).json({
		message: 'sending data'
	});
});

module.exports = router;