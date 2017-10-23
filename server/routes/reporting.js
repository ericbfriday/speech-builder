const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const pool = require('../modules/pool');
// const firebase = require('firebase');
// const db = firebase.database();

router.post('/', function (req, res) {
    word = req.body.word;
    student = req.body.student;
    outcome = req.body.outcome;
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    date = req.body.date;
    queries = [instructor, instructorName, student, word, date]; // does not currently include outcome.
    updateQueryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = '" + instructor + "' AND student = '" + student + "' AND word = '" + word + "';";
    insertQueryString = "";
    // console.log('Logging reporting POST route variables word, student, outcome, instructor, date -> ', word, student, outcome, instructor, instructorName, date);

    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query("SELECT * FROM word_reports ORDER BY id; ", function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    reports = resultObj.rows;
                    for (i = 0; i < reports.length; i++) {
                        if (reports[i].instructor == instructor && reports[i].student == student && reports[i].date == date && reports[i].word == word) {
                            client.query(updateQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
                            done();
                            if (queryErr) {
                                console.log(queryErr);
                                res.sendStatus(500);
                            } else {
                                console.log(resultObj);
                                res.sendStatus(202);
                            }
                            });
                        } else {
                            console.log('No Match Found.');
                            // client.query(insertQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
                            //     done();
                            // });
                        }
                    }
                }
            });
        }
    });
});
module.exports = router;