const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/youtube/:query', async (req, res) =>{
	// console.log("Youtube route hit");
	// console.log("ID: ", req.params.query);

	// console.log("Result from YOUTUBE API: ");
	request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q='+req.params.query+'&key='+process.env.YOUTUBE_API_KEY, function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.
	  if(error === null){
	  	res.status(200).json({
			success: 'YouTube route hit!',
			data: JSON.parse(body)
		});
	  }

	  else{
	  	res.status(400).json({
	  		error: error
	  	});
	  }

	});
})

module.exports = router;

