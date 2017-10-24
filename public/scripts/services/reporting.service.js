myApp.service('ReportingService', function ($http, $firebaseAuth) {
    const sv = this;
    const auth = $firebaseAuth();
    const database = firebase.database();

    sv.report = {};
    sv.currentStudent = {
        data: ''
    };
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
    sv.reportReqObj = {instructor: '', instructorName:'',student: '', date:''}

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
        console.log('logging wordObj -> ', sv.wordObj);

        $http.post('/reporting', sv.wordObj)
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
            }); // end POST
    }; // end sv.opportunityReport

    sv.studentTracker = function (name) {
        console.log('logging student name', name.name);
        sv.currentStudent.data = name.name;
    }; // end sv.studentTracker

    sv.getReport = function(){
        console.log('logging sv.getReport call');
        sv.reportReqObj.instructor = firebase.auth().currentUser.uid;
        sv.reportReqObj.instructorName = firebase.auth().currentUser.displayName;
        sv.reportReqObj.student = sv.currentStudent.data;
        sv.reportReqObj.date = newdate;
        $http.post('/reporting/generate', sv.reportReqObj)
        .then((response)=>{
            // console.log('Logging response inside getReport POST function -> ', response);
            sv.report.data = response.data;

            console.log('logging report -> ', sv.report);
            
        });
    }; // end sv.getReport
});