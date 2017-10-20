myApp.controller('ReportingController', function ($http, $scope) {
    console.log('in Reporting Controller');

    const vm = this;

    vm.report = {
        studentName: '',
        word: '',
        summary: '',
        attempt1: 'na',
        attempt2: 'na',
        attempt3: 'na',
        attempt4: 'na',
        attempt5: 'na',
        attempt6: 'na',
        attempt7: 'na',
        attempt8: 'na',
        attempt9: 'na',
        attempt10: 'na'
    };
});