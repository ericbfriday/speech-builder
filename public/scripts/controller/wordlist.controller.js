myApp.controller('WordListController', function (ListService, WordService, $mdDialog, $scope, $location, $anchorScroll, $http) {
    // console.log('in WordListController Controller');
    const vm = this;
    vm.wordList = ListService.wordList;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;
    vm.mp3URL = WordService.mp3URL;
    vm.definitions = WordService.definitions;
    vm.phoneticSpelling = WordService.phoneticSpelling;
    vm.studyLetter = '';
    vm.lettersList = ListService.lettersList;
    vm.capitalLettersList = ListService.capitalLettersList;

    vm.getLetters = function () {
        console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    };

    vm.getLetterWords = function (letter) {
        console.log('letter ', letter);
        ListService.getWords(letter);

    };

    vm.getWordList = function () {
        console.log('Inside getWordList function/WordList controller');
        ListService.getWords();
    };

    vm.detailPopup = function (ev, word) {
        // console.log('logging word in detailPopup ', word);   
        vm.studyLetter = word.study_letter; 
        // console.log('logging vm.studyLetter', vm.studyLetter);

        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/views/wordDetails.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        });

        vm.wordSearch = function (word) {
            vm.studyWord = word.study_word;
            console.log('logging studyWord, ', vm.studyWord);
            WordService.findDefinition(vm.studyWord);
            vm.mp3URL = WordService.wordResponse.data.lexicalEntries.pronunciations[0].audioFile;
        };

        // runs wordSearch on clicked word
        vm.wordSearch(word);
    };

    function DialogController($scope, $mdDialog) {
        $scope.done = function () {
            $mdDialog.hide();
        };
    }

    // DOING OG REPORTING CONTROLLER JAZZ BELOW THIS LINE!!!!
    // WILL BE REFACTORED LATER.
    // vm.report = {
    //     studentName: '',
    //     word: '',
    //     summary: '',
    //     study_letter: vm.studyLetter,
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

    // vm.addReport = function () {
    //     console.log('in wlc submit function', vm.report);
    //     $http.post('/reporting', vm.report).then((response) => {
    //         console.log('response -->', response);
    //         if (response.status === 201) {
    //             // ITEM CREATED!
    //             console.log('CREATED!');
    //         }
    //     }); // end POST
    // };
});