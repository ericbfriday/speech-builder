myApp.controller('WordListController', function(WordService) {
    console.log('in WordListController Controller');
     
    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;

    vm.getWordList = function(){
        console.log('Inside getWordList function/WordList controller');
    };
 });