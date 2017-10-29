const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request'); 
require('dotenv').config();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    // console.log('in the letters get');
    pool.connect( (conErr, client, done) => {
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM letters_list ORDER BY id; ', (queryErr, resultObj) => {
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
}); // end get '/'

module.exports = router;