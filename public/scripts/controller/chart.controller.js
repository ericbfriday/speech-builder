myApp.controller('ChartController', function ($scope, ReportingService) {

  const vm = this;

  vm.report = ReportingService.report;
  vm.progress = ReportingService.progress;
  vm.currentStudent = ReportingService.currentStudent;
  vm.opportunityWord = ReportingService.opportunityWord;
  vm.wordObj = ReportingService.wordObj;
  vm.studyWord = '';
  vm.soloProgress = ReportingService.soloProgress;

  vm.soloWordSearch = function (wordIn) {
    vm.studyWord = wordIn;
    ReportingService.getSoloReport(vm.studyWord);
  };

  // need to list dates in ascending order
  // series labels correspond to $scope.data index 0, 1, 2.
  $scope.series = ['Satisfactory', 'Prompted', 'Unsatisfactory'];
  $scope.labels = ReportingService.labels;
  $scope.data = ReportingService.data;

  $scope.onClick = function (points, evt) {
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
});