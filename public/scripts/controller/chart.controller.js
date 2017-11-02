myApp.controller('ChartController', function ($scope, ReportingService) {

    const vm = this;

    vm.report = ReportingService.report;
    vm.progress = ReportingService.progress;
    vm.currentStudent = ReportingService.currentStudent;
    vm.opportunityWord = ReportingService.opportunityWord;
    vm.wordObj = ReportingService.wordObj; // = {instructor: '',instructorName: '',student: sv.currentStudent.data,date: '',word: '',result: ''};
    vm.studyWord = '';
    vm.soloProgress = ReportingService.soloProgress; //  = {data: []};
    vm.groupDataSummary = ReportingService.groupDataSummary; // = {data: [{word: '', date:'', data: [[],[],[]]}, {word: '', date:'', data: [[],[],[]]},{word: '',date:'',  data: [[],[],[]]}, {word: '', date:'', data: [[],[],[]]}, {word: '', date:'', data: [[],[],[]]}, {word: '', date:'', data: [[],[],[]]},{word: '', date:'', data: [[],[],[]]},{word: '', date:'', data: [[],[],[]]},{word: '', date:'', data: [[],[],[]]},{word: '', date:'', data: [[],[],[]]}]};
    vm.groupLabels = ReportingService.groupLabels; // = [[],[],[],[],[],[],[],[],[],[]];
    $scope.series = ['Unsatisfactory', 'Prompted', 'Satisfactory'];
    $scope.labels = ReportingService.labels;
    $scope.data = ReportingService.soloData;

    vm.groupWordSearch = () => {
        ReportingService.getReportingCharts()
            .then(() => {
            }).catch((caught) => {
            console.log('catch activated in groupWordSearch -> ', caught);
        });
    }; // end groupWordSearch

    $scope.onClick = (points, evt) => {
        console.log(points, evt);
    }; // end onClick for graph function

    vm.soloWordSearch = (wordIn) => {
        vm.studyWord = wordIn;
        ReportingService.getSoloChart(vm.studyWord);
    }; // end soloWordSearch

    // below sets chart options shared between solo chart and group charts
    $scope.options = {
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left',
                stacked: true,
                ticks: {
                    min: 0
                },
                labelString: '# of Opportunities'
            }
            ],
            xAxes: [{
                stacked: true
            }]
        }
    };
});