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
      var chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      var selectedChartTypeOption = chartTypeOptions[0];

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
            scope.chartDataTable = chartDataTableSamples[scope.chartType.toLowerCase()][scope.chartMajorAxisDataType];
          });

          var unwatchChartType = scope.$watch('chartType', function setChartDataTableByType() {
            scope.chartDataTable = chartDataTableSamples[scope.chartType.toLowerCase()][scope.chartMajorAxisDataType];
          });

          scope.$on('$destroy', function() {
            unwatchChartMajorAxisDataType();
            unwatchChartType();
          });
        }
      };
    }
  ]);
