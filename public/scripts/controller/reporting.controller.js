myApp.controller('ReportingController', function ($http, $scope) {
    console.log('in Reporting Controller');

    const vm = this;

    // vm.report = {
    //     studentName: '',
    //     word: '',
    //     summary: '',
    //     attempt1: 'na',
    //     attempt2: 'na',
    //     attempt3: 'na',
    //     attempt4: 'na',
    //     attempt5: 'na',
    //     attempt6: 'na',
    //     attempt7: 'na',
    //     attempt8: 'na',
    //     attempt9: 'na',
    //     attempt10: 'na'
    // };

    // on each click:
    // log current student, word, attempt result:
    // shove object in array & send to service.
    // create report object by creating new object that lists students with words attempted. Each word has record of results.
    // as new attempts are made, we reach into object and search for student, then word, and then increment attempts.
    // if student is not found, then new student is inserted into array. Word and attempts are added as per below.
    // if word match is not found, then new word is inserted into array of words for student with attempts set to 1. 
    // if word and student match is found, then attempts are incremented by 1. 
    //
    // Object should count following items:
    // User / Teacher
    //      - student
    //          - Words
    //              -Attempts
    //                  -Count for satisfactory, prompted, and unsatisfactory.   
    // Logic will need to search through each one of those. Students are going to be locked to user ID of teacher for security reasons. 
    //  
    // Example objects below:

    this.report = {data: reportObj};
    this.reportObj = { UID: req.user.uid, 
        date: new Date(), 
        teacher: req.user.name,
        students: 
            [{name: bob,
            wordResults: [  {letter: b, word: banana, totalAttempts: 10, satisfactory: 3, prompt: 3, unsatisfactory: 4}, 
                            {letter: s, word: horse, totalAttempts: 11, satisfactory: 2, prompt: 3, unsatisfactory: 6},
                            {letter: s, word: salad, totalAttempts: 10, satisfactory: 3, prompt: 3, unsatisfactory: 4},
                            {letter: t, word: toy, totalAttempts: 16, satisfactory: 9, prompt: 5, unsatisfactory: 2}]
        }]
    };

    


});