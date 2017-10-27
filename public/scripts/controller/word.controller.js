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
    vm.opportunityWordCount = ReportingService.opportunityWordCount;

    vm.wordSearch = (wordIn) => {
        vm.studyWord = wordIn;
        WordService.findDefinition(wordIn);
    };

    vm.playAudio = () => {
        var audio = new Audio(vm.mp3URL.data);
        audio.play();
    };

    vm.opportunityReport = (outcome) => {
        // console.log('Logging opportunity outcome', outcome);
        ReportingService.opportunityReport(vm.studyWord, outcome);
    }; 

    vm.getOpportunities = (word) => {
        ReportingService.getOpportunities(word);
    };

    vm.getReport = () => {
        console.log('logging vm.getReport Call');
        ReportingService.getReport();
    };

    vm.selected = [];
    vm.query = {
      order: 'word',
      limit: 15,
      page: 1
    };
 });