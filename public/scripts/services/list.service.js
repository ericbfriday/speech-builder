myApp.service('ListService', function ($http) {
    const sv = this;

    sv.lettersList = {
        data: []
    };
    sv.wordList = {
        data: []
    };

    sv.listOneSyllable = {data: []};
    sv.listTwoSyllable = {data: []};
    sv.listThreeSyllable = {data: []};
    sv.listFourSyllable = {data: []};
    sv.listFiveSyllable = {data: []};
    sv.listSixSyllable = {data: []};
    sv.listBeginningSyllable = {data: []};
    sv.listMiddleSyllable = {data: []};
    sv.listEndSyllable = {data: []};

    sv.syllableSorter = (arr) => {
        arr.data.forEach(( ele, i, array ) => {
            if (arr.data[i].study_word_syllables == 1) {
                sv.listOneSyllable.data.push(ele);
            } else if (arr.data[i].study_word_syllables == 2) {
                sv.listTwoSyllable.data.push(ele);
            } else if (arr.data[i].study_word_syllables == 3) {
                sv.listThreeSyllable.data.push(ele);
            } else if (arr.data[i].study_word_syllables == 4) {
                sv.listFourSyllable.data.push(ele);
            } else if (arr.data[i].study_word_syllables == 5) {
                sv.listFiveSyllable.data.push(ele);
            } else if (arr.data[i].study_word_syllables == 6) {
                sv.listSixSyllable.data.push(ele);
            } else {
                console.log('no syllables found for word -> ', ele);
            }
        });
        // console.log('sv.listOneSyllable', sv.listOneSyllable);
        // console.log('testing sort -> ', sv.listTwoSyllable, sv.listThreeSyllable, sv.listFourSyllable, sv.listFiveSyllable, sv.listSixSyllable);
    };

    sv.positionSorter = (arr) => {
        arr.data.forEach( (ele, i, arr) => {
            if (arr.data[i].study_letter_location == 'beginning') {
                sv.listBeginningSyllable.data.push(ele);
            } else if (arr.data[i].study_letter_location == 'middle') {
                sv.listMiddleSyllable.data.push(ele);
            } else if (arr.data[i].study_letter_location == 'end') {
                sv.listEndSyllable.data.push(ele);
            } else {
                console.log('no location found for word -> ', ele);
            }
        });
        console.log('logging locations -> ', sv.listBeginningSyllable, sv.listMiddleSyllable, sv.listEndSyllable);  
    };

    sv.getWords = (letterObj) => {
        sv.letter = letterObj.letter;
        // console.log('in list.service.js getWords()', sv.letter);
        $http({
            method: 'GET',
            url: '/words/' + sv.letter
        }).then( (response) => {
            console.log('response', response.data);
            sv.syllableSorter(response);
            sv.positionSorter(response);
            // sv.wordList.data = response.data;
        }).catch( (reason) => {
            console.log('Logging catch in list.service.getWords -> ', reason); 
        });
    }; // end getWords

    sv.getLetters = function () {
        // console.log('in list.service.js getLetters()');
        $http({
            method: 'GET',
            url: '/letters'
        }).then( (response) => {
            // console.log('response', response);
            sv.lettersList.data = response.data;
        });
    }; // end getLetters
}); // end service