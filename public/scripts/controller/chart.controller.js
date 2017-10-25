myApp.controller('ChartController', function ($scope, ReportingService) {
  // console.log('Inside ChartController');

  const vm = this;

  // My work here:
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
    // ReportingService.chartDataUpdate(vm.soloProgress);
    };
 
  // need to list dates in ascending order
  // series labels correspond to $scope.data index 0, 1, 2.
  $scope.labels = ReportingService.labels;
  $scope.series = ['Satisfactory', 'Prompted', 'Unsatisfactory'];
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
          ticks: {min:0}
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'left'
          
        },
        {
          id: 'y-axis-3',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
      
    }
  };

  //   Ignoreing datasetOverride to see if it's relevant to my chart.
  //   $scope.datasetOverride = [{
  //   yAxisID: 'y-axis-1'
  // }, {
  //   yAxisID: 'y-axis-2'
  // }];

  // Charts.js template chart below.

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 73, 65, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
  // $scope.datasetOverride = [{
  //   yAxisID: 'y-axis-1'
  // }, {
  //   yAxisID: 'y-axis-2'
  // }];
  // $scope.options = {
  //   scales: {
  //     yAxes: [{
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       },
  //       {
  //         id: 'y-axis-2',
  //         type: 'linear',
  //         display: true,
  //         position: 'right'
  //       }
  //     ]
  //   }
  // };
});