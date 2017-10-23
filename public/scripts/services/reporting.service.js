myApp.service('ReportingService', function ($http, $firebaseAuth) {
    const sv = this;
    const auth = $firebaseAuth();
    const database = firebase.database();

    sv.report = {};
    sv.currentStudent = {
        data: ''
    };
    sv.studiedWords = [];
    sv.wordObj = {
        instructor: '',
        instructorName: '',
        studentName: sv.currentStudent.data,
        date: '',
        word: '',
        result: ''//,
        // totalAttempts: 0,
        // satisfactory: 0,
        // prompt: 0,
        // unsatisfactory: 0
    };

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
            console.log('response -->', response);
            if (response.status === 203) {
                // ITEM CREATED!
                console.log('CREATED!');
            } else {
                console.log('Error in POST route reporting.service.js');
                
            }
        }); // end POST
    };
        // on load -> pull list of today's reports from server. Keep static in router.
        
        // Query for teacher matching results.
        // Query for student matching results.
        // Query for word matching results. 
        // update totals and tries of words.


        // if teacher matches -> continue update
        // else teacher doesn't match -> new object with traits

        // if student matches -> continue update
        // else studen't doesn't match -> new object with traits

        // if word matches -> continue update
        // else if word doesn't match -> new object with traits


        // if (sv.studyWord == sv.studiedWords.data) {
        //     // console.log('loggin studiedWords[i] -> ', sv.studiedWords[i].word);

        //     if (outcome === 'satisfactory') {
        //         sv.wordObj.satisfactory++;
        //     } else if (outcome === 'prompted') {
        //         sv.wordObj.prompt++;
        //     } else if (outcome === 'unsatisfactory') {
        //         sv.wordObj.unsatisfactory++;
        //     } else {
        //         console.log('Not a match in studyword index -> ', i);
        //     }
        // }
        // for (let i = 0; i < sv.studiedWords.length; i++) {
        //     console.log('running for loop');
        // }

        // // push wordObj into array if it's a new word, otherwise update existing word within array.

        // if (sv.studiedWords.length === 0){
        //     sv.studiedWords.push(sv.wordObj);
        // } else {
        //     for (i=0;i<sv.studiedWords.length;i++) {
        //         if (sv.studiedWords[i].word === studyWord){
        //             sv.studiedWords.splice(index,1, sv.wordObj);
        //             // sv.studiedWords.push(sv.wordObj);
        //         }
        //     }
        // }


        
    // console.log('Studied Words in reporting service -> ', sv.studiedWords);
    // };

    // // outcome logic
    // if (outcome === 'satisfactory') {
    //     sv.wordObj.satisfactory++;
    // } else if (outcome === 'prompted') {
    //     sv.wordObj.prompt++;
    // } else if (outcome === 'unsatisfactory') {
    //     sv.wordObj.unsatisfactory++;
    // } else {
    //     console.log('Error logging outcome in reporting.service.js');
    // }


    // console.log('wordObj in reporting service -> ', sv.wordObj);

    // // pushing logic
    // sv.studiedWords.push(sv.wordObj);
    // console.log('Studied Words in reporting service -> ', sv.studiedWords);

// };

sv.studentTracker = function (name) {
    console.log('logging student name', name.name);
    sv.currentStudent.data = name.name;
};



});