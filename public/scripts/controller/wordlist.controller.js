myApp.controller('WordListController', function(ListService) {
    console.log('in WordListController Controller');
    
    const vm = this;
    vm.wordList = ListService.wordList;

    vm.getWordList = function(){
        console.log('Inside getWordList function/WordList controller');
        ListService.getWords();
    };
 });