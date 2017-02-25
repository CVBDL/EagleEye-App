'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetCreationController
 */
angular.module('eagleeye')

.controller('ChartSetCreationController', [
  '$state',
  'EagleEyeWebService',
  function($state, EagleEyeWebService) {
    var controller = this;

    this.searchKeyword = '';

    this.chartset = {};

    this.chartset.title = '';
    this.chartset.description = '';
    this.chartset.charts = [];

    /**
     * Check if a chart matches the current search condition.
     *
     * @method
     * @param {Object} chart The chart data object.
     * @returns {boolean} `true` for match this filter.
     */
    this.filterFunction = function(chart) {
      return chart.options.title.indexOf(controller.searchKeyword) >= 0 ||
        chart.description.indexOf(controller.searchKeyword) >= 0;
    };

    /**
     * Event handler of check or uncheck a chart in the list.
     *
     * @method
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
     * Change chart order one level up.
     *
     * @method
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
     * Change chart order one level down.
     *
     * @method
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
     * Generate the current selected charts' `_id` property.
     *
     * @method
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
     * Prepare the payload POST to server later, so that we could
     * create a new chart set.
     *
     * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart-set}.
     *
     *
     * @method
     * @param {Object} chartset The chart data model.
     * @returns {Object} The payload object.
     */
    this.makeChartSetPayload = function(chartset) {
      var payload = {};

      payload.title = chartset.title || '';
      payload.description = chartset.description || '';
      payload.charts = this.makeChartsList(chartset.charts);

      return payload;
    };

    /**
     * Prepare the payload POST to server later, so that we could
     * create a new chart set.
     *
     * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart-set}.
     *
     * @method
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
     * Fetch the chart list.
     *
     * @method
     */
    this.loadChartList = function() {
      EagleEyeWebService.getCharts().then(function(chartList) {
        controller.chartList = chartList;
      });
    };

    /**
     * @method
     */
    this.init = function() {
      this.loadChartList();
    };

    this.init();
  }
]);
