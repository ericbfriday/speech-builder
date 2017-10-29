myApp.controller('WordListController', function (ListService, WordService, $mdDialog, $scope, $location, $anchorScroll, $http) {
    // console.log('in WordListController Controller');
    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;
    vm.mp3URL = WordService.mp3URL;
    vm.definitions = WordService.definitions;
    vm.phoneticSpelling = WordService.phoneticSpelling;
    vm.studyLetter = '';
    vm.lettersList = ListService.lettersList;
    vm.capitalLettersList = ListService.capitalLettersList;

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
    };

    function DialogController($scope, $mdDialog) {
        $scope.done = function () {
            $mdDialog.hide();
        };
    }

    vm.getLetters = () => {
        // console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    };

    vm.getLetterWords = (letter) => {
        // console.log('letter ', letter);
        ListService.getWords(letter);

    };

    vm.getWordList = () => {
        // console.log('Inside getWordList function/WordList controller');
        ListService.getWords();
    };




});