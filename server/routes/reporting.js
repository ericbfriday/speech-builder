const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const pool = require('../modules/pool');

router.post('/generate', function (req, res) {
    // console.log('Logging req.body in reporting/generate -> ', req.body);
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    student = req.body.student;
    date = req.body.date;

    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [];
            reportGenQueryString = "SELECT * FROM word_reports WHERE instructor = '" + instructor + "' AND student = '" + student + "';";
            // console.log('logging reportGenQueryString -> ', reportGenQueryString);

            client.query(reportGenQueryString, values, function (error, result) {
                done();
                if (error) {
                    console.log('Error in initial query for reporting.js POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0) {
                    console.log('No results found!');
                    res.status(204).send(result); // 204 sends 'no content' status message but indicates OK connection.
                } else {
                    // console.log('logging result in reporting/generate route -> ', result);
                    res.send(result);
                }
            });
        }
    });
});

router.post('/solochart', function (req, res) {
    // retrieves all reports for a given instructor, student, and word.
    word = req.body.word;
    instructor = req.body.instructor;
    student = req.body.student.data;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log('Error -> ', conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student, word];
            queryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 ORDER BY date ASC;";
            client.query(queryString, values, function (error, result) {
                done();
                if (error) {
                    console.log('Error in initial query for reporting.js POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0) {
                    console.log('No results found!');
                    res.status(204).send(result); // 204 sends 'no content' status message but indicates OK connection.
                } else {
                    console.log('logging result in reporting.js -> ', result);
                    res.status(200).send(result);
                }
            });
        }
    });
});

router.post('/opportunityWord', function (req, res) {
    console.log('Logging req.body in /opportunityWord -> ', req.body);
    word = req.body.word;
    instructor = req.body.instructor;
    student = req.body.student;
    date = req.body.date;

    pool.connect().then(function (client) {
        values = [instructor, student, word, date];
        queryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 AND date = $4;";
        client.query(queryString, values).then(function (result) {
            client.release();
            if (result.rowCount === 0) {
                console.log('No results found!');
                res.status(204).send(result); // 204 sends 'no content' status message but indicates OK connection.
            } else {
                // console.log('logging result in reporting.js -> ', result);
                res.status(200).send(result);
            }
        }).catch(e => {
            client.release();
            console.log('query error ', e);
        });
    }).catch(e => {
        console.log('error on connection -> ', e);

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

    // insert values for params here
    valueUpdate = [outcome, outcome, instructor, student, word, date];
    valueInsert = [outcome, instructor, instructorName, student, word, date];

    updateQueryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = '" + instructor + "' AND student = '" + student + "' AND word = '" + word + "'  AND date = '" + date + "'RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
    insertQueryString = "INSERT INTO word_reports (instructor, instructorname, student, word, date, totalattempts, " + outcome + ") VALUES ('" + instructor + "', '" + instructorName + "', '" + student + "','" + word + "', '" + date + "','1','1') RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
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
                    pool.connect(function (conErr, client, done) {
                        if (conErr) {
                            console.log(conErr);
                            res.sendStatus(500);
                        } else {
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
                        }
                    });
                } else {
                    pool.connect(function (conErr, client, done) {
                        if (conErr) {
                            console.log(conErr);
                            res.sendStatus(500);
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
                        }
                    });
                } // end else for client.query if/else statement
            }); // end client.query
        } // end else for pool.connect function in reporting.js POST route
    }); // end pool.connect function in reporting.js POST route
}); // end POST route

module.exports = router;