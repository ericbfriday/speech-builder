// angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
// .controller('NavCtrl', navCtrl);

// function navCtrl($scope) {
// $scope.currentNavItem = 'home';
// } // end navCtrl()

myApp.controller('NavBarController', function ($location) {
    console.log('navbar controller loaded');

    var vm = this;
    vm.currentNavItem = $location.path();

});