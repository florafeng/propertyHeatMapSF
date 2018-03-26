var express = require('express');
var router = express.Router();
var request = require('request');

var token = "6baca547742c6f96a6ff71b138424f21";
var dataset = 'test';

/* GET home page. */
router.get('/', function(req, res) {
    res.sendfile('views/index.html');
});

/* GET all coordinates. */
router.get('/points', function(req, res, next) {

	var url = "https://rets.io/api/v2/" + dataset + "/listings?access_token=" + token + "&limit=100";
	
	request(url, function (error, response, body) {
		
		if (!error && response.statusCode == 200) {

			var properties = JSON.parse(body)["bundle"];

            // retrive coordinates
			for (i = 0, len = properties.length, coords = []; i < len; i++) { 
				var property = properties[i];
				coords.push([property["Latitude"], property["Longitude"]]);
			}

			res.json(coords);
		}
	})

});

module.exports = router;