myApp.controller('LettersController', function(ListService) {
    console.log('in Letters Controller');
     
    const vm = this;
    
    vm.letterList = ListService.letterList;

    vm.getLetters = function(){
        console.log('Inside getLetters function/letters controller');
        ListService.getLetters();
    };



 });