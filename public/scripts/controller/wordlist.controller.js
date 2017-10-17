myApp.controller('WordListController', function(ListService, WordService, $mdDialog) {
    console.log('in WordListController Controller');
    
    const vm = this;
    vm.wordList = ListService.wordList;

    vm.getWordList = function(){
        console.log('Inside getWordList function/WordList controller');
        ListService.getWords();
    };

    vm.detailPopup = function (ev, word) {
        // console.log('logging word in detailPopup ', word);
        
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/views/wordDetails.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
          });
        //   .then(function(answer) {
        //     $scope.status = 'You said the information was "' + answer + '".';
        //   }, function() {
        //     $scope.status = 'You cancelled the dialog.';
        //   });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
    
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    
 });