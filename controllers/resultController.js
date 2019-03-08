const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/youtube/:query', async (req, res) =>{
	res.status(200).json({
		success: 'YouTube route hit!'
	})
})

module.exports = router;

