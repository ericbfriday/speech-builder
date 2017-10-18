const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request'); 
require('dotenv').config();
const pool = require('../modules/pool');

router.get('/:letter', function (req, res) {
    console.log('in the words get. Letter -> ', req.params);
    letter = req.params.letter;
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query("SELECT * FROM word_list WHERE study_letter='" + letter +"';", function (queryErr, resultObj){
                done();
                if (queryErr){
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    // console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

module.exports = router;