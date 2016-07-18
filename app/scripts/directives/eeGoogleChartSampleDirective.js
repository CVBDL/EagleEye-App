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
      var chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      var selectedChartTypeOption = chartTypeOptions[0];
      var chartDataTableSamples = GoogleChartsService.getChartDataTableSamples(selectedChartTypeOption.value.toLowerCase());

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

          var unwatchChartType = scope.$watch('chartType', function setChartDataTableByType() {
            chartDataTableSamples = GoogleChartsService.getChartDataTableSamples(scope.chartType.toLowerCase());
            scope.chartDataTable = chartDataTableSamples[scope.chartMajorAxisDataType];
          });

          scope.$on('$destroy', function() {
            unwatchChartMajorAxisDataType();
            unwatchChartType();
          });
        }
      };
    }
  ]);
