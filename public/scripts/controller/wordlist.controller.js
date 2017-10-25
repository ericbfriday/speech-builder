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
        // console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    };

    vm.getLetterWords = function (letter) {
        // console.log('letter ', letter);
        ListService.getWords(letter);

    };

    vm.getWordList = function () {
        // console.log('Inside getWordList function/WordList controller');
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
            // console.log('logging studyWord, ', vm.studyWord);
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
});