'use strict';

/**
 * @ngdoc directive
 * @name eagleEyeApp.directive:eagleeye
 * @description
 * # eagleeye
 */
angular.module('eagleeye')
  .directive('eeGoogleChart', [
    '$timeout',
    '$window',
    'GoogleChartsService',
    function($timeout, $window, GoogleChartsService) {
      var defaultChartOptions = GoogleChartsService.getDefaultChartOptions();

      return {
        template: '<div layout="row" layout-sm="column" layout-align="center center"><md-progress-circular class="ee-progress-circular" md-diameter="40"></md-progress-circular></div>',
        scope: {
          chartDataTable: '=',
          chartOptions: '=',
          chartType: '='
        },
        restrict: 'E',
        link: postLinkFn
      };

      function postLinkFn(scope, element) {
        var chartNode = element[0],
          redrawDelayOnResizeInMs = 200,
          timeoutID = -1;

        function drawChart() {
          google.charts.setOnLoadCallback(function drawOnLoad() {
            if (!scope.chartType || !scope.chartDataTable) {
              return;
            }

            var chart = new google.visualization[scope.chartType](chartNode);
            var chartDataTable = new google.visualization.DataTable(angular.copy(scope.chartDataTable, {})); 
            var chartOptions = angular.copy(scope.chartOptions, defaultChartOptions[scope.chartType.toLowerCase()]);
            if(scope.chartType.toLowerCase() == "combochart"){
                chartOptions.seriesType = 'bars';
                chartOptions.series = {5: {type: 'line'}};
            } 

            $timeout(chart.draw(chartDataTable, chartOptions), 0);
          });
        }

        function windowResizeHandler() {
          $window.clearTimeout(timeoutID);
          timeoutID = $window.setTimeout(function() {
            drawChart();
          }, redrawDelayOnResizeInMs);
        }

        var unwatchChartType = scope.$watch('chartType', drawChart);
        var unwatchChartOptions = scope.$watch('chartOptions', drawChart);
        var unwatchChartDataTable = scope.$watch('chartDataTable', drawChart);

        angular.element($window).on('resize', windowResizeHandler);

        scope.$on('$destroy', function() {
          unwatchChartType();
          unwatchChartOptions();
          unwatchChartDataTable();
        });
      }
    }
  ]);
