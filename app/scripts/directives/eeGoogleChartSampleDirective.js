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
        template: '<ee-google-chart class="ee-google-chart" type="{{type}}" options="options" datatable="datatable"></ee-google-chart>',
        scope: {
          type: '@',
          options: '='
        },
        restrict: 'E',
        link: function postLink($scope, $element, $attr) {
          $attr.$observe('type', function setDatatable() {
            updateDatatable();
          });

          function updateDatatable() {
            $scope.datatable = GoogleChartsService.getChartDataTableSamples($scope.type.toLowerCase());
          }
        }
      };
    }
  ]);
