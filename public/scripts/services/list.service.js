myApp.service('ListService', function ($http) {
    const sv = this;

    // sv.capitalLettersList = {
    //     data: []
    // };
    sv.lettersList = {
        data: []
    };
    sv.wordList = {
        data: []
    };

    sv.getWords = (letterObj) => {
        sv.letter = letterObj.letter;
        // console.log('in list.service.js getWords()', sv.letter);
        $http({
            method: 'GET',
            url: '/words/' + sv.letter
        }).then( (response) => {
            // console.log('response', response);
            sv.wordList.data = response.data;
        });
    };

    sv.getLetters = function () {
        // console.log('in list.service.js getLetters()');
        $http({
            method: 'GET',
            url: '/letters'
        }).then( (response) => {
            // console.log('response', response);
            sv.lettersList.data = response.data;
        });
    };
});