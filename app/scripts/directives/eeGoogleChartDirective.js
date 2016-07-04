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
    function ($timeout) {
      return {
        template: '<div layout="row" layout-sm="column" layout-align="center center"><md-progress-circular class="ee-progress-circular" md-diameter="40"></md-progress-circular></div>',
        scope: {
          chartDataTable: '=',
          chartOptions: '=',
          chartType: '='
        },
        restrict: 'E',
        link: function postLink(scope, element) {
          var chartNode = element[0];

          function drawChart() {
            google.charts.setOnLoadCallback(function drawOnLoad() {
              if (!scope.chartType || !scope.chartDataTable) {
                return;
              }

              var chart = new google.visualization[scope.chartType](chartNode);
              var chartDataTable = new google.visualization.DataTable(angular.copy(scope.chartDataTable, {}));
              var chartOptions = scope.chartOptions;

              // default options
              chartOptions.legend = {
                position: 'top',  // can be 'bottom', 'left', 'in', 'none', 'right' or 'top'
                alignment: 'end',  // can be 'start', 'center' or 'end'
                maxLines: 2,  // Maximum number of lines in the legend.
                textStyle: {
                  color: '#555555'
                }
              }
              chartOptions.titlePosition = 'none';

              $timeout(chart.draw(chartDataTable, chartOptions), 0);
            });
          }

          var unwatchChartType = scope.$watch('chartType', drawChart);
          var unwatchChartOptions = scope.$watch('chartOptions', drawChart);
          var unwatchChartDataTable = scope.$watch('chartDataTable', drawChart);

          scope.$on('$destroy', function() {
            unwatchChartType();
            unwatchChartOptions();
            unwatchChartDataTable();
          });
        }
      };
    }
  ]);
