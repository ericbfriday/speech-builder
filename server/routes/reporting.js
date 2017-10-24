const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const pool = require('../modules/pool');
// const firebase = require('firebase');
// const db = firebase.database();

router.post('/', function (req, res) {
    console.log('req.body log -> ', req.body);
    
    word = req.body.word;
    student = req.body.student;
    outcome = req.body.outcome;
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    date = req.body.date;
    
    updateQueryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = '" + instructor + "' AND student = '" + student + "' AND word = '" + word + "';";
    insertQueryString = "INSERT INTO word_reports (instructor, instructorname, student, word, date, totalattempts, " + outcome + ") VALUES ('" + instructor + "', '" + instructorName + "', '" + student + "','" + word + "', '" + date + "','1','1');";
    searchQueryString = "FIND * FROM word_reports WHERE instructor = $1 student = $3 word = $4 date = $5;";
    // console.log('Logging reporting POST route variables word, student, outcome, instructor, date -> ', word, student, outcome, instructor, instructorName, date);

    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student, word, date];
            searchQueryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 AND date = $4;";
            client.query(searchQueryString, values, function(error, result){
                done();
                if (error) {
                    console.log('Error in initial query for reporting.js POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0){
                    console.log('Outcome not already in results DB -> ', result);
                    client.query(insertQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
                        done();
                        if (queryErr) {
                            console.log(queryErr);
                            res.sendStatus(500);
                        } else {
                            console.log(resultObj);
                            res.sendStatus(201);
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
                            console.log('match found -> ', resultObj);
                            res.sendStatus(202);
                        }
                    }); // end else for client.query if/else statement
                }; // end else for client.query if/else statement
            });  // end client.query
        }; // end else for pool.connect function in reporting.js POST route
    }); // end pool.connect function in reporting.js POST route
});



            // OG else statement below. 
        // } else {
        //     client.query("SELECT * FROM word_reports ORDER BY id; ", function (queryErr, resultObj) {
        //         done();
        //         if (queryErr) {
        //             console.log(queryErr);
        //             res.sendStatus(500);
        //         } else { 
        //             reports = resultObj.rows;
        //             for (i = 0; i < reports.length; i++) {
        //                 if (reports[i].instructor == instructor && reports[i].student == student && reports[i].date == date && reports[i].word == word) {
        //                     client.query(updateQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
        //                     done();
        //                     if (queryErr) {
        //                         console.log('query error -> ', queryErr);
        //                         res.sendStatus(500);
        //                     } else {
        //                         console.log('match found -> ', resultObj);
        //                         res.sendStatus(202);
        //                     }
        //                     });
        //                     break;
        //                 } else {
        //                     console.log('No Match Found.');
        //                     // client.query(insertQueryString, function (queryErr, resultObj) { // Queries DB to update appropriate outcomes
        //                     //     done();
        //                     //     if (queryErr) {
        //                     //         console.log(queryErr);
        //                     //         res.sendStatus(500);
        //                     //     } else {
        //                     //         console.log(resultObj);
        //                     //         res.sendStatus(201);
        //                     //         return;
        //                     //     }
        //                     // });
        //                 }
        //             }
        //         }
        //     });
        // }
//     });
// });
module.exports = router;