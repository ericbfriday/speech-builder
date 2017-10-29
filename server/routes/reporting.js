const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const pool = require('../modules/pool');

router.post('/generate', (req, res) => {
    // console.log('Logging req.body in reporting/generate -> ', req.body);
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    student = req.body.student;
    date = req.body.date;

    pool.connect((conErr, client, done) => {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [];
            reportGenQueryString = "SELECT * FROM word_reports WHERE instructor = '" + instructor + "' AND student = '" + student + "';";
            // console.log('logging reportGenQueryString -> ', reportGenQueryString);

            client.query(reportGenQueryString, values, (error, result) => {
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
}); // end POST '/generate'

router.post('/solochart', (req, res) => {
    // retrieves all reports for a given instructor, student, and word.
    word = req.body.word;
    instructor = req.body.instructor;
    student = req.body.student.data;
    pool.connect((conErr, client, done) => {
        if (conErr) {
            console.log('Error -> ', conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student, word];
            queryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 ORDER BY date ASC;";
            client.query(queryString, values, (error, result) => {
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
});// end POST 'solochart'

router.post('/opportunityWord', (req, res) => {
    console.log('Logging req.body in /opportunityWord -> ', req.body);
    word = req.body.word;
    instructor = req.body.instructor;
    student = req.body.student;
    date = req.body.date;

    pool.connect().then((client) => {
        values = [instructor, student, word, date];
        queryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 AND date = $4;";
        client.query(queryString, values).then((result) => {
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
});// end POST 'opportunityWord'

router.post('/', (req, res) => {
    word = req.body.word;
    student = req.body.student;
    outcome = req.body.outcome;
    instructor = req.body.instructor;
    instructorName = req.body.instructorName;
    date = req.body.date;

    // cannot parameterize column head variables -- need to reconsider how to code that.

    pool.connect((conErr, client, done) => {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student, word, date];
            searchQueryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 AND word = $3 AND date = $4;";
            client.query(searchQueryString, values, (error, result) => {
                if (error) {
                    done();
                    console.log('Error in initial query for reporting.js POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0) {
                    valueInsert = [instructor, instructorName, student, word, date];
                    insertQueryString = "INSERT INTO word_reports (instructor, instructorname, student, word, date, totalattempts, " + outcome + ") VALUES ($1, $2, $3, $4, $5, 1, 1) RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
                    // insertQueryString = "INSERT INTO word_reports (instructor, instructorname, student, word, date, totalattempts, " + outcome + ") VALUES ('" + instructor + "', '" + instructorName + "', '" + student + "','" + word + "', '" + date + "','1','1') RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
                    // console.log('Outcome not already in results DB -> ', result);
                    client.query(insertQueryString, valueInsert, (queryErr, resultObj) => { // Queries DB to update appropriate outcomes
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
                    valueUpdate = [instructor, student, word, date];
                    updateQueryString = "UPDATE word_reports SET totalattempts = totalattempts + 1, " + outcome + " = " + outcome + " + 1 WHERE instructor = $1 AND student = $2 AND word = $3  AND date = $4 RETURNING instructor, student, word, date, totalattempts, satisfactory, prompted, unsatisfactory;";
                    client.query(updateQueryString, valueUpdate, (queryErr, resultObj) => { // Queries DB to update appropriate outcomes
                        done();
                        if (queryErr) {
                            console.log('update query error in reporting.js router -> ', queryErr);
                            res.sendStatus(500);
                        } else {
                            // console.log('match found -> ', resultObj);
                            res.status(202).send(resultObj);
                        }
                    }); // end else for client.query if/else statement
                } // end else for client.query if/else statement
            }); // end client.query
        } // end else for pool.connect function in reporting.js POST route
    }); // end pool.connect function in reporting.js POST route
}); // end POST '/'

router.post('/reportingCharts', (req, res) => {
    // retrieves all reports for a given instructor, student, and word.
    instructor = req.body.instructor;
    student = req.body.student.data;
    pool.connect((conErr, client, done) => {
        if (conErr) {
            console.log('Error in reportingCharts -> ', conErr);
            res.sendStatus(500);
        } else {
            values = [instructor, student];
            queryString = "SELECT * FROM word_reports WHERE instructor = $1 AND student = $2 ORDER BY date DESC;";
            client.query(queryString, values, (error, result) => {
                done();
                if (error) {
                    console.log('Error in initial query for reporting.js reportingCharts POST route -> ', error);
                    res.sendStatus(500);
                } else if (result.rowCount === 0) {
                    console.log('No results found in reportingCharts!');
                    res.status(204).send(result); // 204 sends 'no content' status message but indicates OK connection.
                } else {
                    console.log('logging result in reporting.js reportingCharts -> ', result);
                    res.status(200).send(result);
                }
            });
        }
    });
}); // end POST 'reportingCharts'

module.exports = router;