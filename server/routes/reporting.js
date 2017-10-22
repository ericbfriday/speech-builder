const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request'); 
require('dotenv').config();
const pool = require('../modules/pool');

router.post('/', function (req, res) {
    // Data arrives as follows from word.service.js -> data: {word: studyWord, student: sv.studentName.data, outcome: outcome}
    // console.log('in the reporting get', req);
    word = req.body.word;
    student = req.body.student;
    outcome = req.body.outcome;
    instructor = req.body.instructor;
    date = new Date();
    console.log('Logging reporting POST route variables word, student, outcome, instructor, date -> ', word, student, outcome, instructor, date);
    
    // commented out until Schema is established
    // pool.connect(function (conErr, client, done){
    //     if (conErr){
    //         console.log(conErr);
    //         res.sendStatus(500);
    //     } else { // NEED TO REPLACE BELOW WITH INSERT FUNCTION
    //         client.query('SELECT * FROM reporting_list ORDER BY id; ', function (queryErr, resultObj){
    //             done();
    //             if (queryErr){
    //                 console.log(queryErr);
    //                 res.sendStatus(500);
    //             } else {
    //                 // console.log(resultObj.rows);
    //                 res.send(resultObj.rows);
    //             }
    //         });
    //     }
    // });
});

module.exports = router;