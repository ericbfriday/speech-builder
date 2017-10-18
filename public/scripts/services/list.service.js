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

    sv.getWords = function (letterObj) {
        sv.letter = letterObj.letter;
        console.log('in list.service.js getWords()', sv.letter);
        $http({
            method: 'GET',
            url: '/words/' + sv.letter
        }).then(function (response) {
            console.log('response', response);
            sv.wordList.data = response.data;
        });
    };

    sv.getLetters = function () {
        console.log('in list.service.js getLetters()');
        $http({
            method: 'GET',
            url: '/letters'
        }).then(function (response) {
            // console.log('response', response);
            sv.lettersList.data = response.data;
            // for (var i = 0; i < sv.lettersList.data.length - 1; i++) {
            //     sv.capitalLettersList.data[i].letter = sv.lettersList.data[i].letter.toUpperCase();
        });
    };
});