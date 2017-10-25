myApp.controller('ChartController', function ($scope) {
  console.log('Inside ChartController');

  const vm = this;

  // begin google charts API code
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540]
    ]);

    var options = {
      title: 'Company Performance',
      hAxis: {
        title: 'Year',
        titleTextStyle: {
          color: '#333'
        }
      },
      vAxis: {
        minValue: 0
      }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
});
// end google charts API attempt

// Charts.js code below.
// $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
// $scope.series = ['Series A', 'Series B'];
// $scope.data = [
//   [65, 59, 73, 65, 56, 55, 40],
//   [28, 48, 40, 19, 86, 27, 90]
// ];
// $scope.onClick = function (points, evt) {
//   console.log(points, evt);
// };
// $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
// $scope.options = {
//   scales: {
//     yAxes: [
//       {
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
// });