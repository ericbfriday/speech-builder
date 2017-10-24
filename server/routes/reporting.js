const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const pool = require('../modules/pool');

router.post('/generate', function(req,res){
    console.log('Logging req.body in reporting/generate -> ', req.body);
    instructor = req.body.date;
    instructorName = req.body.instructorName;
    student = req.body.student;
    date = req.body.date;

    // CURRENTLY TESTING POST AND WRITING QUERY
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [];
            reportGenQueryString = "";
        }
    });
});
router.post('/', function (req, res) {
    // console.log('req.body log -> ', req.body);
    word = req.body.word;
    student = req.body.student;
    outcome = req.body.outcome;
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    date = req.body.date;

    updateQueryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = '" + instructor + "' AND student = '" + student + "' AND word = '" + word + "' RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
    insertQueryString = "INSERT INTO word_reports (instructor, instructorname, student, word, date, totalattempts, " + outcome + ") VALUES ('" + instructor + "', '" + instructorName + "', '" + student + "','" + word + "', '" + date + "','1','1') RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
    searchQueryString = "FIND * FROM word_reports WHERE instructor = $1 student = $3 word = $4 date = $5;";
    // console.log('Logging reporting POST route variables word, student, outcome, instructor, date -> ', word, student, outcome, instructor, instructorName, date);

    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student, word, date];
            searchQueryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 AND date = $4;";
            client.query(searchQueryString, values, function (error, result) {
                done();
                if (error) {
                    console.log('Error in initial query for reporting.js POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0) {
                    // console.log('Outcome not already in results DB -> ', result);
                    client.query(insertQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
                        done();
                        if (queryErr) {
                            console.log(queryErr);
                            res.sendStatus(500);
                        } else {
                            // console.log(resultObj);
                            res.status(201).send(resultObj);
                            return;
                        }
                    });
                } else {
                    client.query(updateQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
                        done();
                        if (queryErr) {
                            console.log('query error -> ', queryErr);
                            res.sendStatus(500);
                        } else {
                            // console.log('match found -> ', resultObj);
                            res.status(202).send(resultObj);
                        }
                    }); // end else for client.query if/else statement
                }; // end else for client.query if/else statement
            }); // end client.query
        }; // end else for pool.connect function in reporting.js POST route
    }); // end pool.connect function in reporting.js POST route
}); // end POST route

module.exports = router;