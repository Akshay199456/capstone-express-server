const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.get('/', async(req, res) => {
	res.status(400).json({
		message: 'sending data'
	});
});


router.post('/login', async(req, res) =>{
	console.log("Login route hit");
});


router.post('/register', async(req, res) =>{
	console.log('Register route hit!');
	
});


module.exports = router;