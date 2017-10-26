myApp.service('ReportingService', function ($http, $firebaseAuth) {
    const sv = this;
    const auth = $firebaseAuth();
    const database = firebase.database();

    sv.report = {};
    sv.currentStudent = {
        data: ''
    };
    sv.opportunityWord = {instructor: '', student: '', word: '', date: ''};
    sv.wordObj = {
        instructor: '',
        instructorName: '',
        student: sv.currentStudent.data,
        date: '',
        word: '',
        result: ''
    };
    sv.progress = {
        instructor: '',
        student: '',
        date: '',
        word: '',
        totalAttempts: 0,
        satisfactory: 0,
        prompted: 0,
        unsatisfactory: 0
    };
    sv.reportReqObj = {instructor: '', instructorName:'',student: '', date:''};
    sv.soloReportReqObj = {instructor: '', word: '', student: ''};
    sv.soloProgress = {data: []};
    sv.labels = [];
    sv.data = [[],[],[]];

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;

    sv.opportunityReport = function (studyWord, outcome) {
        // console.log('logging word, student, and outcome -> ', studyWord, sv.currentStudent.data, outcome);
        sv.wordObj.instructor = firebase.auth().currentUser.uid;
        sv.wordObj.instructorName = firebase.auth().currentUser.displayName;
        sv.wordObj.student = sv.currentStudent.data;
        sv.wordObj.word = studyWord;
        sv.wordObj.date = newdate;
        sv.wordObj.outcome = outcome;
        sv.progress.totalAttempts = 0;
        sv.progress.satisfactory = 0;
        sv.progress.prompted = 0;
        sv.progress.unsatisfactory = 0;
        console.log('logging wordObj -> ', sv.wordObj);

        return $http.post('/reporting', sv.wordObj)
            .then((response) => {
                // console.log('response -->', response.data.rows[0]);
                if (response.status === 202) {
                    sv.progress.instructor = response.data.rows[0].instructor;
                    sv.progress.student = response.data.rows[0].student;
                    sv.progress.date = response.data.rows[0].date;
                    sv.progress.word = response.data.rows[0].word;
                    sv.progress.totalAttempts = response.data.rows[0].totalattempts;
                    sv.progress.satisfactory = response.data.rows[0].satisfactory;
                    sv.progress.prompted = response.data.rows[0].prompted;
                    sv.progress.unsatisfactory = response.data.rows[0].unsatisfactory;
                    // console.log('UPDATED! -> ', sv.progress);
                } else if (response.status === 201) {
                    sv.progress.instructor = response.data.rows[0].instructor;
                    sv.progress.student = response.data.rows[0].student;
                    sv.progress.date = response.data.rows[0].date;
                    sv.progress.word = response.data.rows[0].word;
                    sv.progress.totalAttempts = response.data.rows[0].totalattempts;
                    sv.progress.satisfactory = response.data.rows[0].satisfactory;
                    sv.progress.prompted = response.data.rows[0].prompted;
                    sv.progress.unsatisfactory = response.data.rows[0].unsatisfactory;
                    // console.log('CREATED! -> ', sv.progress);
                } else {
                    console.log('Catching error in POST route reporting.service.js -> ', response);
                }
            }).catch(function(reason){
                console.log('Catch activated in reporting.service.js -> ', reason);
            }); // end POST
    }; // end sv.opportunityReport

    sv.studentTracker = function (name) {
        sv.currentStudent.data = name.name;
    }; // end sv.studentTracker

    sv.getReport = function(){
        console.log('logging sv.getReport call');
        sv.reportReqObj.instructor = firebase.auth().currentUser.uid;
        sv.reportReqObj.instructorName = firebase.auth().currentUser.displayName;
        sv.reportReqObj.student = sv.currentStudent.data;
        sv.reportReqObj.date = newdate;
        return $http.post('/reporting/generate', sv.reportReqObj)
        .then((response)=>{
            // console.log('Logging response inside getReport POST function -> ', response);
            sv.report.data = response.data;
            console.log('logging report -> ', sv.report);
        });
    }; // end sv.getReport

    sv.getOpportunities = function(word) {
        sv.opportunityWord.instructor =  firebase.auth().currentUser.uid;
        sv.opportunityWord.student = sv.currentStudent.data;
        sv.opportunityWord.word = word;
        sv.opportunityWord.date = newdate;
        sv.progress.totalAttempts = 0;
        sv.progress.satisfactory = 0;
        sv.progress.prompted = 0;
        sv.progress.unsatisfactory = 0;
        return $http.post('/reporting/opportunityWord', sv.opportunityWord)
        .then((response)=>{
            // console.log('logging response -> ', response);
            sv.progress.instructor = response.data.rows[0].instructor;
            sv.progress.student = response.data.rows[0].student;
            sv.progress.date = response.data.rows[0].date;
            sv.progress.word = response.data.rows[0].word;
            sv.progress.totalAttempts = response.data.rows[0].totalattempts;
            sv.progress.satisfactory = response.data.rows[0].satisfactory;
            sv.progress.prompted = response.data.rows[0].prompted;
            sv.progress.unsatisfactory = response.data.rows[0].unsatisfactory;
        }).catch(function(reason){
            console.log('Catch activated in reporting.service.js -> ', reason);
        });
    };

    sv.getSoloReport = function (word) {
        sv.labels.length = 0;
        sv.data[0].length = 0;
        sv.data[1].length = 0;
        sv.data[2].length = 0;
        sv.soloReportReqObj.student = sv.currentStudent;
        sv.soloReportReqObj.instructor = firebase.auth().currentUser.uid;
        sv.soloReportReqObj.word = word;
        return $http.post('/reporting/solochart', sv.soloReportReqObj)
        .then((response) => {
            sv.soloProgress = response.data.rows;
            console.log('logging sv.soloProgress -> ', sv.soloProgress);
            sv.chartDataUpdate(sv.soloProgress);
        });
    }; // end getSoloReport

    sv.chartDataUpdate = function (report) {
        console.log('logging report in chartDataUpdate -> ', report);
        for (let i = 0; i < report.length; i++){
            // console.log('report[i].satisfactory', report[i].satisfactory);
            sv.labels.push(report[i].date); // working as intended
            sv.data[0].push(report[i].satisfactory);
            sv.data[1].push(report[i].prompted);
            sv.data[2].push(report[i].unsatisfactory);
            // console.log('sv.data', sv.data);
        }
        // console.log('logging sv.labels and sv.data -> ', sv.labels, sv.data);
    }; // end chartDataUpdate
});
