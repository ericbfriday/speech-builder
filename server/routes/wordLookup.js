const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request'); 
require('dotenv').config();
// var path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/', function (req, res) {
  var searchWord = req.body.word;
  // console.log('logging searchWord -> ', searchWord);
  var wordDefinition = {
    url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + searchWord + '/regions=us',
    headers: {
      "Accept": "application/json",
      "app_id": process.env.APP_ID,
      "app_key": process.env.APP_KEY
    }
  };
  request(wordDefinition, function (error, response, body) {
    if (response && response.statusCode == 200) {
      console.log('logging 200 inside wordLookup.js router ', response.statusCode);
      res.send(body);
    } else {
      res.sendStatus(500);
      console.log('Logging 500 in wordLookup.js router ', error);
    }
  });
});

module.exports = router;