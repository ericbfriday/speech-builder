myApp.service('ListService', function($http){
    const sv = this;

    sv.letterList = { data: [] };
    sv.wordList = { data: [] };

    sv.getWords = function() {
        console.log('in list.service.js getWords()');
        
        $http ({
            method: 'GET',
            url: '/words'
        }).then(function (response) {
            console.log('response', response);
            sv.wordList.data = response.data;
        }
        );
    };
});