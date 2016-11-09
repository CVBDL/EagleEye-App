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
    function(GoogleChartsService) {
      return {
        template: '<ee-google-chart class="ee-google-chart" chart-type="chartType" chart-options="chartOptions" chart-data-table="chartDataTable"></ee-google-chart>',
        scope: {
          chartType: '@',
          chartMajorAxisDataType: '@',
          chartOptions: '='
        },
        restrict: 'E',
        link: function postLink($scope, $element, $attr) {
          $attr.$observe('chartType', function setChartDataTable() {
            updateChartDataTable();
          });

          $attr.$observe('chartMajorAxisDataType', function setChartDataTable() {
            updateChartDataTable();
          });

          function updateChartDataTable() {
            $scope.chartDataTable = GoogleChartsService.getChartDataTableSamples($scope.chartType.toLowerCase(), $scope.chartMajorAxisDataType);
          }
        }
      };
    }
  ]);
