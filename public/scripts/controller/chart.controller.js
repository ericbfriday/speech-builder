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

  $scope.groupData1 = vm.groupDataSummary.data[0].data;
  $scope.groupData2 = vm.groupDataSummary.data[1].data;
  $scope.groupData3 = vm.groupDataSummary.data[2].data;
  $scope.groupData4 = vm.groupDataSummary.data[3].data;
  $scope.groupData5 = vm.groupDataSummary.data[4].data;
  $scope.groupData6 = vm.groupDataSummary.data[5].data;
  $scope.groupData7 = vm.groupDataSummary.data[6].data;
  $scope.groupData8 = vm.groupDataSummary.data[7].data;
  $scope.groupData9 = vm.groupDataSummary.data[8].data;
  $scope.groupData10 = vm.groupDataSummary.data[9].data;

  $scope.labels1 = vm.groupLabels[0];
  $scope.labels2 = vm.groupLabels[1];
  $scope.labels3 = vm.groupLabels[2];
  $scope.labels4 = vm.groupLabels[3];
  $scope.labels5 = vm.groupLabels[4];
  $scope.labels6 = vm.groupLabels[5];
  $scope.labels7 = vm.groupLabels[6];
  $scope.labels8 = vm.groupLabels[7];
  $scope.labels9 = vm.groupLabels[8];
  $scope.labels10 = vm.groupLabels[9];

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

  // need to list dates in ascending order
  // series labels correspond to $scope.data index 0, 1, 2.
  $scope.series = ['Unsatisfactory', 'Prompted', 'Satisfactory'];
  $scope.labels = ReportingService.labels;
  $scope.data = ReportingService.soloData;

  $scope.onClick = (points, evt) => {
    console.log(points, evt);
  };

  $scope.options = {
    scales: {
      yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          stacked: true,
          ticks: {
            min: 0
          }
        }
      ],
      xAxes: [{
        stacked: true,
      }]
    }
  };

  // vm.groupData1 = ReportingService.groupData1.data;
  // vm.groupData2 = ReportingService.groupData2.data;
  // vm.groupData3 = ReportingService.groupData3.data;
  // vm.groupData4 = ReportingService.groupData4.data;
  // vm.groupData5 = ReportingService.groupData5.data;
  // vm.groupData6 = ReportingService.groupData6.data;
  // vm.groupData7 = ReportingService.groupData7.data;
  // vm.groupData8 = ReportingService.groupData8.data;
  // vm.groupData9 = ReportingService.groupData9.data;
  // vm.groupData10 = ReportingService.groupData10.data;
});