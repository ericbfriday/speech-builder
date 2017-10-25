myApp.controller('WordController', function(WordService, ReportingService) {
    // console.log('in Word Controller');

    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;
    vm.mp3URL = WordService.mp3URL;
    vm.definitions = WordService.definitions;
    vm.studyWord = WordService.wordToDefine.word;
    vm.phoneticSpelling = WordService.phoneticSpelling;
    vm.progress = ReportingService.progress;
    vm.report = ReportingService.report;

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
        ReportingService.opportunityReport(vm.studyWord, outcome);
    }; 

    vm.getReport = function(){
        console.log('logging vm.getReport Call');
        ReportingService.getReport();
    };

    vm.selected = [];
    
    vm.query = {
      order: 'word',
      limit: 10,
      page: 1
    };
 });