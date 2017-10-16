myApp.controller('LettersController', function(WordService) {
    console.log('in Letters Controller');
     
    const vm = this;
    vm.definition = WordService.definition;
    vm.wordResponse = WordService.wordResponse;

    vm.getLetters = function(){
        console.log('Inside getLetters function/letters controller');
        
    };
 });