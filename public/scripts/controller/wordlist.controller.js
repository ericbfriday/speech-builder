myApp.controller('WordListController', function (ListService, WordService, $mdDialog, $scope, $location, $anchorScroll, $http) {
    // console.log('in WordListController Controller');
    const vm = this;
    vm.capitalLettersList = ListService.capitalLettersList;
    vm.definition = WordService.definition;
    vm.definitions = WordService.definitions;
    vm.lettersList = ListService.lettersList;
    vm.mp3URL = WordService.mp3URL;
    vm.phoneticSpelling = WordService.phoneticSpelling;
    vm.studyLetter = '';
    vm.wordResponse = WordService.wordResponse;

    vm.listOneSyllable = ListService.listOneSyllable;
    vm.listTwoSyllable = ListService.listTwoSyllable;
    vm.listThreeSyllable = ListService.listThreeSyllable;
    vm.listFourSyllable = ListService.listFourSyllable;
    vm.listFiveSyllable = ListService.listFiveSyllable;
    vm.listSixSyllable = ListService.listSixSyllable;
    vm.listBeginningSyllable = ListService.listBeginningSyllable;
    vm.listMiddleSyllable = ListService.listMiddleSyllable;
    vm.listEndSyllable = ListService.listEndSyllable;

    vm.detailPopup = (ev, word) => {
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

        vm.wordSearch = (word) => {
            vm.studyWord = word.study_word;
            console.log('logging studyWord, ', vm.studyWord);
            WordService.findDefinition(vm.studyWord);
            vm.mp3URL = WordService.wordResponse.data.lexicalEntries.pronunciations[0].audioFile;
        };

        vm.wordSearch(word);
    }; // end detailPopup

    function DialogController($scope, $mdDialog) {
        $scope.done = function () {
            $mdDialog.hide();
        };
    } // end DialogController

    vm.getLetters = () => {
        // console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    }; // end getLetters

    vm.getLetterWords = (letter) => {
        // console.log('letter ', letter);
        ListService.getWords(letter);

    }; // end getLetterWords

    vm.getWordList = () => {
        // console.log('Inside getWordList function/WordList controller');
        ListService.getWords();
    }; // end getWordList


});