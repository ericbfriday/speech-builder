myApp.controller('WordController', function(WordService) {
    console.log('in Word Controller');

    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;
    vm.mp3URL = WordService.mp3URL;
    vm.definitions = WordService.definitions;
    vm.studyWord = WordService.wordToDefine.word;
    vm.phoneticSpelling = WordService.phoneticSpelling;

    vm.wordSearch = function(wordIn) {
        vm.studyWord = wordIn;
        WordService.findDefinition(wordIn);
        // vm.mp3URL = WordService.wordResponse.data.lexicalEntries.pronunciations[0].audioFile;
    };

    vm.playAudio = function() {
        var audio = new Audio(vm.mp3URL.data);
        audio.play();
    };

    vm.opportunityReport = function(outcome) {
        // console.log('Logging opportunity outcome', outcome);
        WordService.opportunityReport(vm.studyWord, outcome);
    }; 
 });