'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartOptionsController
 * @description
 * # ChartOptionsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartOptionsController', [
    '$scope',
    '$http',
    '$state',
    '$stateParams',
    'GoogleChartsService',
    'EagleEyeWebService',
    'eeHelpDialogService',
    'IS_STACKED_OPTIONS',
    'AXIS_FORMAT_OPTIONS',
    function($scope, $http, $state, $stateParams, GoogleChartsService, EagleEyeWebService, eeHelpDialogService, IS_STACKED_OPTIONS, AXIS_FORMAT_OPTIONS) {
      var controller = this;

      this.id = $stateParams.id;
      this.isStackedOptions = IS_STACKED_OPTIONS;
      this.formatStringOptions = AXIS_FORMAT_OPTIONS;
      this.chart = {};

      /**
       * @method
       * @name makeChartPayload
       *
       * @description
       * Prepare the payload PUT to server later, so that we could update the chart.
       * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart}.
       *
       * @param {Object} chart The chart object contains user input values.
       * @returns {Object} The payload JSON object.
       *
       * @todo Make the method smaller
       */
      this.makeChartPayload = function(chart) {
        var payload = {};

        // basic fields
        // =====================================================================
        payload.description = chart.description || '';
        payload.friendlyUrl = GoogleChartsService.makeFriendlyUrl('chart', chart.friendlyUrl);

        // configuration options
        // TODO: create individual functions to make it smaller?
        // =====================================================================
        payload.options = {};

        payload.options.title = chart.options.title || '';

        payload.options.hAxis = {};
        payload.options.hAxis.title = chart.options.hAxis.title || '';
        payload.options.hAxis.format = chart.options.hAxis.format || '';

        payload.options.vAxis = {};
        payload.options.vAxis.title = chart.options.vAxis.title || '';
        payload.options.vAxis.format = chart.options.vAxis.format || '';

        // TODO: only combo chart requires this option
        payload.options.combolines = chart.options.combolines || '';

        // TODO: only some chart types support this option
        payload.options.isStacked = chart.options.isStacked || false;

        payload.options.chartArea = GoogleChartsService.makeChartAreaOptions(chart.options.chartArea.left, chart.options.chartArea.width);

        return payload;
      };

      this.save = function(chart) {
        var payload = this.makeChartPayload(chart);

        EagleEyeWebService.updateChartById(chart._id, payload).then(function() {
          $state.go('chart', {
            id: chart._id
          });

        }, function(error) {
          console.log(error);
        });
      };

      this.showHelp = function() {
        eeHelpDialogService.showHelp();
      };

      function init() {
        EagleEyeWebService.getChartById(controller.id).then(function(response) {
          controller.chart = response;

          // remove prefix
          controller.chart.friendlyUrl = response.friendlyUrl ? response.friendlyUrl.substring(2) : '';
        });
      };

      init();
    }
  ]);
