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
    function($state, GoogleChartsService, EagleEyeWebService, eeHelpDialogService) {
      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      this.isStackedOptions = GoogleChartsService.getIsStackedOptions();
      this.formatStringOptions = GoogleChartsService.getFormatStringOptions();

      this.chart = {
        chartType: 'ColumnChart',
        domainDataType: 'string',
        description: '',
        friendlyUrl: '',
        options: {
          title: '',
          hAxis: {
            title: '',
            format: ''
          },
          vAxis: {
            title: '',
            format: ''
          },
          combolines: '',
          isStacked: false,
          chartArea: {
            left: '',
            width: ''
          }
        }
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
        // TODO: individual validation funtion required?
        if (chart.chartType) {
          payload.chartType = chart.chartType;

        } else {
          throw new Error('Invalid chart type.');
        }

        // TODO: individual validation funtion required?
        if (chart.domainDataType) {
          payload.domainDataType = chart.domainDataType;

        } else {
          throw new Error('Invalid chart domain data type.');
        }

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

      this.save = function(chart) {
        var payload = this.makeChartPayload(chart);

        EagleEyeWebService.createChart(payload).then(function(newChart) {
          $state.go('chartSettings', {
            id: newChart._id
          });

        }, function(error) {
          console.log(error);
        });
      };

      this.showHelp = function() {
        eeHelpDialogService.showHelp();
      };

    }
  ]);
