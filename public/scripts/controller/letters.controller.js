myApp.controller('LettersController', function(ListService) {
    console.log('in Letters Controller');
     
    const vm = this;
    
    vm.lettersList = ListService.lettersList;
    vm.capitalLettersList = ListService.capitalLettersList;

    vm.getLetters = function(){
        console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    };

    vm.getLetterWords = function(letter) {
        console.log('letter ', letter);
        ListService.getWords(letter);
    };



 });