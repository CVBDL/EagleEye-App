'use strict';

/**
 * @ngdoc directive
 * @name eagleEyeApp.directive:eagleeye
 * @description
 * # eagleeye
 */
angular.module('eagleeye')
  .directive('eeGoogleChart', [
    '$rootScope',
    '$timeout',
    '$window',
    'GoogleChartsService',
    'DEFAULT_CHART_OPTIONS',
    function($rootScope, $timeout, $window, GoogleChartsService, DEFAULT_CHART_OPTIONS) {

      return {
        template: '<div layout="row" layout-sm="column" layout-align="center center"><md-progress-circular class="ee-progress-circular" md-diameter="40"></md-progress-circular></div>',
        scope: {
          chartDataTable: '=',
          chartOptions: '=',
          chartType: '=',
          chartFile: '='
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
            if (!scope.chartType || !scope.chartDataTable || 'ImageChart' === scope.chartType) {
              return;
            }

            var chart = new google.visualization[scope.chartType](chartNode);
            var chartDataTable = new google.visualization.DataTable(angular.copy(scope.chartDataTable, {}));
            var chartOptions = angular.merge({}, DEFAULT_CHART_OPTIONS[scope.chartType.toLowerCase()], angular.copy(scope.chartOptions, {}));

            if (scope.chartType.toLowerCase() === 'combochart') {

              if (isNaN(chartOptions.combolines) || chartOptions.combolines.length === 0) {
                chartOptions.combolines = 1;
              }

              chartOptions.seriesType = 'bars';
              chartOptions.series = {};

              for (var i = 0; i < chartOptions.combolines; i++) {
                chartOptions.series[i] = { type: 'line' };
              }
            }

            // format percent values
            // TODO: it'll format all columns to percentage, it should be configurable
            var formatter;
            var numberOfColumns = 0;
            var pattern = '#,###.###%';

            if (chartOptions.vAxis && chartOptions.vAxis.format === 'percent' || chartOptions.hAxis && chartOptions.hAxis.format === 'percent') {
              formatter = new google.visualization.NumberFormat({ pattern: pattern });
              numberOfColumns = chartDataTable.getNumberOfColumns();

              for (var j = 1; j < numberOfColumns; j++) {
                formatter.format(chartDataTable, j);
              }
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
        var unwatchChartOptions = scope.$watch('chartOptions', drawChart, true);
        var unwatchChartDataTable = scope.$watchCollection('chartDataTable', drawChart);

        $rootScope.$on('ee.googlechart.redraw', windowResizeHandler);

        angular.element($window).on('resize', windowResizeHandler);

        scope.$on('$destroy', function() {
          unwatchChartType();
          unwatchChartOptions();
          unwatchChartDataTable();
        });
      }
    }
  ]);
