const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


router.get('/', async(req, res) => {
	res.status(200).json({
		message: 'sending data'
	});
});


router.post('/login', async(req, res) =>{
	console.log("Login route hit");
});


router.post('/register', async(req, res) =>{
	console.log('Register route hit!');
	console.log("Req body: ", req.body);

	if(req.body.password === req.body.verify_password){
		const password = req.body.password;
		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const userDbEntry = {};
		userDbEntry.username = req.body.username;
		userDbEntry.password = hashedPassword;
		userDbEntry.email = req.body.email;
		try {

		    const user = await User.create(userDbEntry);
		    console.log("Registered user: ", user);

		    req.session.logged = true;
		    req.session.email = req.body.email;
		    req.session.userId = user._id;

		    const sessionObject = {};
		    sessionObject.logged = req.session.logged;
		    sessionObject.email = req.session.email;
		    sessionObject.userId = req.session.userId;

		    res.status(200).json({
		      success: 'User successfully registered',
		      session: sessionObject
		    });
		  } 

		  catch(err){
		    console.log(err);
		    res.status(400).send({
		    	error: 'Email already exists. Please enter a new email to register an account'
		    });
		  }
	}

	else{
		res.status(400).json({
			error: 'Password and Verify Password don\'t match. Please make sure they are the same'
		})
	}
});


module.exports = router;