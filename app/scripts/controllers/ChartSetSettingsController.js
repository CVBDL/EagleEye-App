'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetSettingsController
 */
angular.module('eagleeye')

.controller('ChartSetSettingsController', [
  '$state',
  '$stateParams',
  '$q',
  'EagleEyeWebService',
  function($state, $stateParams, $q, EagleEyeWebService) {

    var controller = this;

    this.id = $stateParams.id;

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
      return (chart.options.title.indexOf(controller.searchKeyword) >= 0
             || chart.description.indexOf(controller.searchKeyword) >= 0);
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
        this.chartset.charts.forEach(function(_chart, idx) {
          if (chart._id === _chart._id) {
            index = idx;
          }
        });

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
     * update chart set.
     *
     * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart-set}.
     *
     *
     * @method
     * @param {Object} chartset The chart data model.
     */
    this.save = function(chartset) {
      var id = chartset._id,
        payload = this.makeChartSetPayload(chartset);

      EagleEyeWebService.updateChartSetById(id, payload)
        .then(function() {
          $state.go('chartSets');
        });
    };

    /**
     * Fetch chart set by id.
     *
     * @method
     * @param {string} id Chart set id.
     */
    this.loadChartSet = function(id) {
      return EagleEyeWebService.getChartSetById(id)
        .then(function(chartset) {
          controller.chartset = chartset;
        });
    };

    /**
     * Fetch the chart list.
     *
     * @method
     */
    this.loadChartList = function() {
      return EagleEyeWebService.getCharts()
        .then(function(chartList) {
          controller.chartList = chartList;
        });
    };

    /**
     * @method
     */
    this.init = function() {
      $q.all([this.loadChartSet(this.id), this.loadChartList()])
        .then(function() {
          controller.chartList.forEach(function(chart) {
            controller.chartset.charts.forEach(function(_chart) {
              if (chart._id === _chart._id) {
                chart.checked = true;
              }
            });
          });
        });
    };

    this.init();
  }
]);
