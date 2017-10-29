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

  vm.soloWordSearch = (wordIn) => {
    vm.studyWord = wordIn;
    ReportingService.getSoloReport(vm.studyWord);
  };

  vm.groupWordSearch = () => {
    ReportingService.getReportingCharts()
    .then(()=> {
      console.log('Completed groupWordSearch - vm.groupDataSummary ->', vm.groupDataSummary);
    }).catch((caught)=>{
      console.log('catch activated in groupWordSearch -> ', caught);
    });
  };

  $scope.onClick = (points, evt) => {
    console.log(points, evt);
  };

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