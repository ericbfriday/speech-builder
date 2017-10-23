// angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
// .controller('NavCtrl', navCtrl);

// function navCtrl($scope) {
// $scope.currentNavItem = 'home';
// } // end navCtrl()

myApp.controller('NavBarController', function ($location, WordService, ReportingService) {
    console.log('navbar controller loaded');

    var vm = this;
    vm.currentNavItem = $location.path();
    vm.student = { name: ''};

    vm.trackStudent = function(name){
        vm.student.name = name;
        console.log('vm.student.name ', vm.student.name);
        ReportingService.studentTracker(vm.student);
    };

});