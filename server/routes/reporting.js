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
    queryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = '" + instructor + "' AND student = '" + student + "' AND word = '" + word + "';";
    // console.log('Logging reporting POST route variables word, student, outcome, instructor, date -> ', word, student, outcome, instructor, instructorName, date);
    
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log(conErr);
            res.sendStatus(500);
        } else { // NEED TO REPLACE BELOW WITH INSERT FUNCTION
            client.query("SELECT * FROM word_reports ORDER BY id; ", function (queryErr, resultObj){
                done();
                if (queryErr){
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    reports = resultObj.rows;
                    // console.log(resultObj.rows);
                    // loop through resultObj and search for results with matching instructor. Then matching student, then matching word. 
                    for (i=0; i<reports.length;i++){ // for loop matching instructors
                        if(reports[i].instructor == instructor){ // checks for matching instructors
                            for (i=0; i<reports.length;i++){ // for loop matching student
                                if(reports[i].student == student){ // checks for matching students
                                    for (i=0; i<reports.length;i++){ // for loop matching words
                                        if(reports[i].word == word){ // checks for matching words
                                            // console.log('Logging Query String -> ', queryString);
                                            client.query(queryString, function (queryErr, resultObj){ // Queries DB to update appropriate outcomes
                                            done();
                                            if (queryErr){
                                                console.log(queryErr);
                                                res.sendStatus(500);
                                            } else {
                                                res.sendStatus(203);
                                            }});
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // for loop matching instructors, if found, proceed to update.
                    // for loop matching student, if found, proceed to update.
                    // for loop matching word, if found,  proceed to update.
                    // matching everything. Proceed to update. Update totalAttempts & corresponding column by totalAttempts=totalAttempts+1, etc...
                    // else for loop matching word, if word not found, INSERT function from req.
                    // else for loop matching student, if student not found, INSERT function from req.
                    // else for loop matching instructor, if instructor not found, INSERT function from req.
                    // outside of all loops -> query DB for matching instructor, student, word and return results via res.send(resultObj.rows);

                    // res.send(resultObj.rows);
                }
            });
        }
    });
});

module.exports = router;