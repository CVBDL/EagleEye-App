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
      this.chartset.friendlyUrl = '';
      this.chartset.charts = [];

      /**
       * @method
       * @name makeDisplayFriendlyUrl
       * @description We need to remove friendly url prefix 's-' when display on the page.
       * @param {string} friendlyUrl
       * @returns {string} Generated friendly url.
       */
      this.makeDisplayFriendlyUrl = function(friendlyUrl) {
        return (angular.isString(friendlyUrl) && friendlyUrl) ? friendlyUrl.substring(2) : '';
      };

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
        payload.friendlyUrl = EagleEyeWebService.makeFriendlyUrl('chartset', chartset.friendlyUrl);
        payload.charts = this.makeChartsList(chartset.charts);

        return payload;
      };

      /**
       * @method
       * @name save
       *
       * @description
       * Prepare the payload POST to server later, so that we could update chart set.
       * {@link https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart-set}.
       *
       * @param {Object} chartset The chart data model.
       */
      this.save = function(chartset) {
        var id = this.chartset._id,
          payload = this.makeChartSetPayload(chartset);

        EagleEyeWebService.updateChartSetById(id, payload).then(function() {
          $state.go('chartSets');
        });
      };

      /**
       * @method
       * @name loadChartSet
       * @description Fetch chart set by id.
       * @param {string} id Chart set id.
       */
      this.loadChartSet = function(id) {
        return EagleEyeWebService.getChartSetById(id).then(function(chartset) {
          controller.chartset = chartset;
          controller.chartset.friendlyUrl = controller.makeDisplayFriendlyUrl(chartset.friendlyUrl);
        });
      };

      /**
       * @method
       * @name loadChartList
       * @description Fetch the chart list.
       */
      this.loadChartList = function() {
        return EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });
      };

      /**
       * @method
       * @name init
       */
      this.init = function() {
        $q.all([this.loadChartSet(this.id), this.loadChartList()]).then(function() {
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
