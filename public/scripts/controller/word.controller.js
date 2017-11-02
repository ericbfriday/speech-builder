myApp.controller('WordController', function (WordService, ReportingService) {
    // console.log('in Word Controller');

    const vm = this;
    vm.definition = WordService.definition;
    vm.definitions = WordService.definitions;
    vm.mp3URL = WordService.mp3URL;
    vm.opportunityWordCount = ReportingService.opportunityWordCount;
    vm.phoneticSpelling = WordService.phoneticSpelling;
    vm.progress = ReportingService.progress;
    vm.report = ReportingService.report;
    vm.query = {
        order: 'word',
        limit: 15,
        page: 1
    };
    vm.selected = [];
    vm.studyWord = WordService.wordToDefine.word;
    vm.wordResponse = WordService.wordResponse;


    vm.getOpportunities = (word) => {
        ReportingService.getOpportunities(word);
    }; // end getOpportunities

    vm.getReport = () => {
        console.log('logging vm.getReport Call');
        ReportingService.getReport();
    }; // end getReport

    vm.opportunityReport = (outcome) => {
        // console.log('Logging opportunity outcome', outcome);
        ReportingService.opportunityReport(vm.studyWord, outcome);
    }; // end opportunityReport

    vm.playAudio = () => {
        var audio = new Audio(vm.mp3URL.data);
        audio.play();
    }; // end playAudio

    vm.wordSearch = (wordIn) => {
        vm.studyWord = wordIn;
        WordService.findDefinition(wordIn);
    }; // end wordSearch
});