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
        restrict: 'E',
        template: '<div layout="row" layout-sm="column" layout-align="center center"><md-progress-circular class="ee-progress-circular" md-diameter="40"></md-progress-circular></div>',
        scope: {
          chartId: '@',
          type: '@',
          datatable: '=',
          options: '='
        },
        link: postLinkFn
      };

      function postLinkFn(scope, element, attrs) {
        var chartNode = element[0],
          redrawDelayOnResizeInMs = 200,
          timeoutID = -1,
          chart,
          imageURI;

        function drawChart() {
          google.charts.setOnLoadCallback(function drawOnLoad() {
            if (!scope.type || !scope.datatable || 'ImageChart' === scope.type) {
              return;
            }

            chart = new google.visualization[scope.type](chartNode);
            var datatable = new google.visualization.DataTable(angular.copy(scope.datatable, {}));
            var options = angular.merge({}, DEFAULT_CHART_OPTIONS[scope.type.toLowerCase()], angular.copy(scope.options, {}));

            if (scope.type.toLowerCase() === 'combochart') {

              if (isNaN(options.combolines) || options.combolines.length === 0) {
                options.combolines = 1;
              }

              options.seriesType = 'bars';
              options.series = {};

              for (var i = 0; i < options.combolines; i++) {
                options.series[i] = { type: 'line' };
              }
            }

            // format percent values
            // TODO: it'll format all columns to percentage, it should be configurable
            var formatter;
            var numberOfColumns = 0;
            var pattern = '#,###.###%';

            if (options.vAxis && options.vAxis.format === 'percent' || options.hAxis && options.hAxis.format === 'percent') {
              formatter = new google.visualization.NumberFormat({ pattern: pattern });
              numberOfColumns = datatable.getNumberOfColumns();

              for (var j = 1; j < numberOfColumns; j++) {
                formatter.format(datatable, j);
              }
            }

            google.visualization.events.addListener(chart, 'ready', function() {
              imageURI = chart.getImageURI();
            });

            $timeout(chart.draw(datatable, options), 0);
          });
        }

        function getImageURIHandler(evt, id) {
          if (scope.chartId === id) {
            $rootScope.$emit('ee.googlechart.imageURI', {
              id: id,
              imageURI: imageURI
            });
          }
        }

        function windowResizeHandler() {
          $window.clearTimeout(timeoutID);
          timeoutID = $window.setTimeout(function() {
            drawChart();
          }, redrawDelayOnResizeInMs);
        }

        // var unwatchtype = scope.$watch('type', drawChart);
        var unwatchType = attrs.$observe('type', drawChart);
        var unwatchOptions = scope.$watch('options', drawChart, true);
        var unwatchDatatable = scope.$watchCollection('datatable', drawChart);

        $rootScope.$on('ee.googlechart.getImageURI', getImageURIHandler);
        $rootScope.$on('ee.googlechart.redraw', windowResizeHandler);

        angular.element($window).on('resize', windowResizeHandler);

        scope.$on('$destroy', function() {
          unwatchType();
          unwatchOptions();
          unwatchDatatable();
        });
      }
    }
  ]);
