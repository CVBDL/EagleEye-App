'use strict';

/**
 * @ngdoc directive
 * @name eagleeye.directive:eeGoogleChartSample
 * @description
 * # eeGoogleChartSample
 */
angular.module('eagleeye')
  .directive('eeGoogleChartSample', [
    'GoogleChartsService',
    function (GoogleChartsService) {
      var chartDataTableSamples = GoogleChartsService.getChartDataTableSamples();

      return {
        template: '<ee-google-chart chart-type="chartType" chart-options="chartOptions" chart-data-table="chartDataTable"></ee-google-chart>',
        scope: {
          chartOptions: '=',
          chartType: '=',
          chartMajorAxisDataType: '='
        },
        restrict: 'E',
        link: function postLink(scope) {
          var unwatchChartMajorAxisDataType = scope.$watch('chartMajorAxisDataType', function setChartDataTable() {
            scope.chartDataTable = chartDataTableSamples[scope.chartMajorAxisDataType];
          });

          scope.$on('$destroy', function() {
            unwatchChartMajorAxisDataType();
          });
        }
      };
    }
  ]);
