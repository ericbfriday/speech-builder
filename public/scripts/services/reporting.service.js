myApp.service('ReportingService', function($http, $firebaseAuth){
    const sv = this;
    const auth = $firebaseAuth();
    const database = firebase.database();

    sv.report = {};
    sv.currentStudent = {data: ''};
    sv.studiedWords = [];
    sv.wordObj = {studentName: sv.currentStudent, word: '', totalAttempts: 0, satisfactory: 0, prompt: 0, unsatisfactory: 0};

    sv.opportunityReport = function (studyWord, outcome) {
        console.log('logging word, student, and outcome -> ', studyWord, sv.currentStudent.data, outcome);
        sv.wordObj.studentName = sv.currentStudent.data;
        sv.wordObj.word = studyWord;
        sv.wordObj.totalAttempts ++;

        // outcome logic
        if (outcome === 'satisfactory') {
            sv.wordObj.satisfactory ++;
        } else if (outcome === 'prompted'){
            sv.wordObj.prompt ++;
        } else if (outcome === 'unsatisfactory') {
            sv.wordObj.unsatisfactory ++;
        } else {
            console.log('Error logging outcome in reporting.service.js');
        }
        console.log('wordObj in reporting service -> ', sv.wordObj);
        
        // pushing logic
        sv.studiedWords.push(sv.wordObj);
        console.log('Studied Words in reporting service -> ', sv.studiedWords);
        
    };

    sv.studentTracker = function(name) {
        console.log('logging student name', name.name);
        sv.currentStudent.data = name.name;
    };



});