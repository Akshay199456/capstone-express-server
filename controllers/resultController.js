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


router.get('/nytNews/:query', async (req, res) =>{
	console.log("NYT News route hit!");
	console.log('Query String: ', req.params.query);

	request('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+req.params.query+'&api-key='+process.env.NYT_KEY, function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.);

	  if(error === null){
	  	res.status(200).json({
			success: 'NYT News route hit!',
			data: JSON.parse(body)
		});
	  }

	  else{
	  	res.status(400).json({
	  		error: error
	  	});
	  }
	});
});

module.exports = router;

