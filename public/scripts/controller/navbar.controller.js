myApp.controller('NavBarController', function ($mdDialog, $location, $scope, WordService, ReportingService, AuthService) {

    var vm = this;
    vm.currentNavItem = $location.path();
    vm.student = {name: ''};
    vm.user = AuthService.user;

    vm.logIn = () => {
        AuthService.logIn();
    }; // end logIn

    vm.logOut = () => {
        AuthService.logOut();
    }; // end logOut

    $scope.showAlert = (ev) => {
        console.log('showAlert');
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#logoutAlert')))
                .clickOutsideToClose(true)
                .textContent('You have been logged out of Speech Builder.')
                .ariaLabel('Logged out')
                .ok('OK')
                .targetEvent(ev)
        );
    }; // end showAlert

    vm.trackStudent = (name) => {
        vm.student.name = name;
        console.log('vm.student.name ', vm.student.name);
        ReportingService.studentTracker(vm.student);
    }; // end trackStudent
});