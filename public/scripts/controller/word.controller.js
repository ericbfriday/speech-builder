myApp.controller('WordController', function(WordService) {
    console.log('in Word Controller');
     
    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;
    vm.mp3URL = WordService.mp3URL;
    vm.definitions = WordService.definitions;
    vm.studyWord = WordService.wordToDefine.word;

    vm.wordSearch = function(wordIn) {
        vm.studyWord = wordIn;
        WordService.findDefinition(wordIn);
        // vm.mp3URL = WordService.wordResponse.data.lexicalEntries.pronunciations[0].audioFile;
    };

    // vm.filter("trustUrl", ['$sce', function ($sce) {
    //     return function (recordingUrl) {
    //         return $sce.trustAsResourceUrl(recordingUrl);
    //     };
    // }]);

 });