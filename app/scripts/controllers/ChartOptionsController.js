'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartOptionsController
 */
angular.module('eagleeye')
  .controller('ChartOptionsController', [
    '$state',
    '$stateParams',
    'EagleEyeWebService',
    'EagleEyeWebServiceUtil',
    'EEDialogService',
    'GoogleChartsService',
    'IS_STACKED_OPTIONS',
    'AXIS_FORMAT_OPTIONS',
    function($state, $stateParams, EagleEyeWebService, EagleEyeWebServiceUtil, EEDialogService, GoogleChartsService, IS_STACKED_OPTIONS, AXIS_FORMAT_OPTIONS) {
      var controller = this;

      this.id = $stateParams.id;

      this.isStackedOptions = IS_STACKED_OPTIONS;
      this.axisFormatOptions = AXIS_FORMAT_OPTIONS;

      this.chart = {};

      /**
       * @method
       * @name showHelp
       * @description Show an help dialog.
       */
      this.showHelp = function() {
        EEDialogService.showChartCreationHelping();
      };

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

        payload.description = chart.description || '';
        payload.options = GoogleChartsService.makeConfigurationOptions(chart.chartType, chart.options);

        return payload;
      };

      /**
       * @method
       * @name save
       * @description Save the chart updates.
       * @param {Object} chart The chart data model.
       */
      this.save = function(chart) {
        var payload = this.makeChartPayload(chart);

        EagleEyeWebService.updateChartById(chart._id, payload).then(function() {
          $state.go('chart', {
            id: chart._id
          });
        });
      };

      /**
       * @method
       * @name init
       * @description Initialize this controller
       */
      this.init = function() {
        EagleEyeWebService.getChartById(controller.id).then(function(response) {
          controller.chart = response;
        });
      };

      this.init();
    }
  ]);
