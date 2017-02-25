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
  'EEDialogService',
  'GoogleChartsService',
  'IS_STACKED_OPTIONS',
  'AXIS_FORMAT_OPTIONS',
  function($state, $stateParams, EagleEyeWebService, EEDialogService,
           GoogleChartsService, IS_STACKED_OPTIONS, AXIS_FORMAT_OPTIONS) {

    var controller = this;

    this.id = $stateParams.id;

    this.isStackedOptions = IS_STACKED_OPTIONS;
    this.axisFormatOptions = AXIS_FORMAT_OPTIONS;

    this.chart = {};

    /**
     * Show an help dialog.
     *
     * @method
     */
    this.showHelp = function() {
      EEDialogService.showChartCreationHelping();
    };

    /**
     * Prepare the payload PUT to server later, so that we could
     * update the chart.
     *
     * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart}.
     *
     * @method
     * @param {Object} chart The chart object contains user input values.
     * @returns {Object} The payload JSON object.
     */
    this.makeChartPayload = function(chart) {
      var payload = {};

      payload.description = chart.description || '';

      payload.options = GoogleChartsService.makeConfigurationOptions(
        chart.chartType, chart.options);

      return payload;
    };

    /**
     * Save the chart updates.
     *
     * @method
     * @param {Object} chart The chart data model.
     */
    this.save = function(chart) {
      var payload = this.makeChartPayload(chart);

      EagleEyeWebService.updateChartById(chart._id, payload)
        .then(function() {
          $state.go('chart', {
            id: chart._id
          });
        });
    };

    /**
     * Initialize this controller
     *
     * @method
     */
    this.init = function() {
      EagleEyeWebService.getChartById(controller.id)
        .then(function(response) {
          controller.chart = response;
        });
    };

    this.init();
  }
]);
