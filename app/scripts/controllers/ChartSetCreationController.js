'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetCreationController
 * @description
 * # ChartSetCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetCreationController', [
    '$state',
    'EagleEyeWebService',
    'EagleEyeWebServiceUtil',
    function ($state, EagleEyeWebService, EagleEyeWebServiceUtil) {
      var controller = this;

      this.searchKeyword = '';

      this.chartset = {};

      this.chartset.title = '';
      this.chartset.description = '';
      this.chartset.friendlyUrl = '';
      this.chartset.charts = [];

      /**
       * @method
       * @name filterFunction
       * @description Check if a chart matches the current search condition.
       * @param {Object} chart The chart data object.
       * @returns {boolean} `true` for match this filter.
       */
      this.filterFunction = function(chart) {
        return chart.options.title.indexOf(controller.searchKeyword) >= 0 ||
          chart.description.indexOf(controller.searchKeyword) >= 0;
      };

      /**
       * @method
       * @name onChartCheckedStatusChange
       * @description Event handler of check or uncheck a chart in the list.
       * @param {Object} chart The chart data object.
       */
      this.onChartCheckedStatusChange = function(chart) {
        var index = -1;

        if (chart.checked) {
          this.chartset.charts.push(chart);

        } else {
          index = this.chartset.charts.indexOf(chart);

          if (index > -1) {
            this.chartset.charts.splice(index, 1);
          }
        }
      };

      /**
       * @method
       * @name moveUp
       * @description Change chart order one level up.
       * @param {Object} chart The chart data object.
       */
      this.moveUp = function(chart) {
        var index = this.chartset.charts.indexOf(chart);

        if (index > 0) {
          this.chartset.charts.splice(index, 1);
          this.chartset.charts.splice(index - 1, 0, chart);
        }
      };

      /**
       * @method
       * @name moveDown
       * @description Change chart order one level down.
       * @param {Object} chart The chart data object.
       */
      this.moveDown = function(chart) {
        var index = this.chartset.charts.indexOf(chart);

        if (index < this.chartset.charts.length - 1) {
          this.chartset.charts.splice(index, 1);
          this.chartset.charts.splice(index + 1, 0, chart);
        }
      };

      /**
       * @method
       * @name makeChartsList
       * @description Generate the current selected charts' `_id` property.
       * @param {Array} charts A charts list.
       * @returns {Array} List of given charts' `_id`.
       */
      this.makeChartsList = function(charts) {
        var chartIdList = [];

        charts.forEach(function(chart) {
          chartIdList.push(chart._id);
        });

        return chartIdList;
      };

      /**
       * @method
       * @name makeChartSetPayload
       *
       * @description
       * Prepare the payload POST to server later, so that we could create a new chart set.
       * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart-set}.
       *
       * @param {Object} chartset The chart data model.
       * @returns {Object} The payload object.
       */
      this.makeChartSetPayload = function(chartset) {
        var payload = {};

        payload.title = chartset.title || '';
        payload.description = chartset.description || '';
        payload.friendlyUrl = EagleEyeWebServiceUtil.makeFriendlyUrl('chartset', chartset.friendlyUrl);
        payload.charts = this.makeChartsList(chartset.charts);

        return payload;
      };

      /**
       * @method
       * @name save
       *
       * @description
       * Prepare the payload POST to server later, so that we could create a new chart set.
       * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart-set}.
       *
       * @param {Object} chartset The chart data model.
       */
      this.save = function(chartset) {
        var payload = this.makeChartSetPayload(chartset);

        EagleEyeWebService.createChartSet(payload).then(function(newChartSet) {
          $state.go('chartSet', {
            id: newChartSet._id
          });
        });
      };

      /**
       * @method
       * @name loadChartList
       * @description Fetch the chart list.
       */
      this.loadChartList = function() {
        EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });
      };

      /**
       * @method
       * @name init
       */
      this.init = function() {
        this.loadChartList();
      };

      this.init();
    }
  ]);
