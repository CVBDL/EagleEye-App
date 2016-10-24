'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartCreationController
 * @description
 * # ChartCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartCreationController', [
    '$state',
    'GoogleChartsService',
    'EagleEyeWebService',
    'eeHelpDialogService',
    'CHART_TYPE_OPTIONS',
    'IS_STACKED_OPTIONS',
    'AXIS_FORMAT_OPTIONS',
    function($state, GoogleChartsService, EagleEyeWebService, eeHelpDialogService, CHART_TYPE_OPTIONS, IS_STACKED_OPTIONS, AXIS_FORMAT_OPTIONS) {
      this.chartTypeOptions = CHART_TYPE_OPTIONS;
      this.isStackedOptions = IS_STACKED_OPTIONS;
      this.formatStringOptions = AXIS_FORMAT_OPTIONS;

      this.chart = {};
      // default chart type
      this.chart.chartType = 'ColumnChart';
      // default domain data type
      this.chart.domainDataType = 'string';
      this.chart.description = '';
      this.chart.friendlyUrl = '';

      this.chart.options = {};
      this.chart.options.title = '';
      this.chart.options.combolines = '';
      // default isStacked option
      this.chart.options.isStacked = false;
      this.chart.options.hAxis = {
        title: '',
        format: '' // default to none
      };
      this.chart.options.vAxis = {
        title: '',
        format: '' // default to none
      };
      this.chart.options.chartArea = {
        left: '',
        width: ''
      };

      /**
       * @method
       * @name showHelp
       * @description Show a help popup dialog.
       */
      this.showHelp = function() {
        eeHelpDialogService.showHelp();
      };

      /**
       * @method
       * @name save
       * @description Prepare new chart payload and save it to backend.
       * @param {Object} chart The chart data model.
       */
      this.save = function(chart) {
        var payload = this.makeChartPayload(chart);

        EagleEyeWebService.createChart(payload).then(function(newChart) {
          $state.go('chartSettings', {
            id: newChart._id
          });
        });
      };

      /**
       * @method
       * @name makeChartPayload
       *
       * @description
       * Prepare the payload POST to server later, so that we could create a new chart.
       * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart}.
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
        payload.chartType = chart.chartType;
        payload.domainDataType = chart.domainDataType;
        payload.description = chart.description || '';
        payload.friendlyUrl = GoogleChartsService.makeFriendlyUrl('chart', chart.friendlyUrl);

        // datatable
        // =====================================================================
        payload.datatable = GoogleChartsService.getChartDataTableSamples(chart.chartType, chart.domainDataType);

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

        payload.options.chartArea = GoogleChartsService.makeChartArea(chart.options.chartArea.left, chart.options.chartArea.width);

        return payload;
      };

    }
  ]);
