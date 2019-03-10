const express = require('express');
const router = express.Router();
const request = require('request');

//  Tumblr authentication
const tumblr = require('tumblr.js');
const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET_KEY,
  token: process.env.TUMBLR_TOKEN,
  token_secret: process.env.TUMBLR_TOKEN_SECRET
});



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



router.get('/newsApi/:query', async (req, res) =>{
	console.log("News API route hit!");
	console.log('Query String: ', req.params.query);
	// &domains=techcrunch.com

	request('https://newsapi.org/v2/everything?q='+req.params.query+'&language=en'+'&sortBy=publishedAt&apiKey='+process.env.NEWS_API_KEY, function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.);

	  if(error === null){
	  	res.status(200).json({
			success: 'News API route hit!',
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



router.get('/techcrunch/:query', async (req, res) =>{
	console.log("TechCrunch API route hit!");
	console.log('Query String: ', req.params.query);

	request('https://newsapi.org/v2/everything?q='+req.params.query+'&language=en&domains=techcrunch.com'+'&sortBy=publishedAt&apiKey='+process.env.NEWS_API_KEY, function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.);

	  if(error === null){
	  	res.status(200).json({
			success: 'TechCrunch route hit!',
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


router.get('/musixmatch/:query', async(req, res) =>{
	console.log('MusixMatch API route hit!');
	console.log('Query String: ', req.params.query);

	request('https://api.musixmatch.com/ws/1.1/track.search?q='+req.params.query+'&apikey='+process.env.MUSIXMATCH_API, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.);

	  if(error === null){
	  	res.status(200).json({
			success: 'MusixMatch route hit!',
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


router.get('/tumblr/:query', async(req, res) => {
	console.log(' Tumblr API route hit!');
	console.log('Query String: ', req.params.query);

	client.taggedPosts(req.params.query, function(err, data){
		if(err){
			res.status(400).json({
	  			error: err
	  		});
		}

		else{
			res.status(200).json({
				success: 'Tumblr route hit!',
				data: data
			});
		}
	});
});




module.exports = router;

