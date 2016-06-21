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
        template: '<div></div>',
        scope: {
          chartDataTable: '=',
          chartOptions: '=',
          chartType: '='
        },
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
          var chartNode = element[0];

          var unwatchChartType = scope.$watch('chartType', drawChart);
          var unwatchChartOptions = scope.$watch('chartOptions', drawChart);
          var unwatchChartDataTable = scope.$watch('chartDataTable', drawChart);

          scope.$on('$destroy', function() {
            unwatchChartType();
            unwatchChartOptions();
            unwatchChartDataTable();
          });

          function drawChart() {
            google.charts.setOnLoadCallback(function drawOnLoad() {
              if (!scope.chartType || !scope.chartDataTable) return;
              var chart = new google.visualization[scope.chartType](chartNode);
              var chartDataTable = new google.visualization.DataTable(scope.chartDataTable);
              var chartOptions = scope.chartOptions;

              $timeout(chart.draw(chartDataTable, chartOptions), 0);
            });
          }
        }
      };
    }
  ]);
