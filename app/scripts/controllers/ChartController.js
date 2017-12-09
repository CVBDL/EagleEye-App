'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartController
 */
angular.module('eagleeye')

.controller('ChartController', [
  '$stateParams',
  '$location',
  '$interval',
  'EagleEyeChartTools',
  'EagleEyeWebService',
  'EEDialogService',
  function($stateParams, $location, $interval, EagleEyeChartTools,
           EagleEyeWebService, EEDialogService) {

    var controller = this;

    this.id = $stateParams.id;

    /** @constant {number} */
    this.DELAY = 60 * 1000;

    /** @default false */
    this.isAutoReloadSwitchOn = false;

    /** @default null */
    this.autoReloadChartPromise = null;

    this.chart = {};

    this.showFilter = false;

    /**
     * Call EagleEyeWebService service to load the chart data.
     *
     * @method
     * @param {string} id  Chart id.
     */
    this.loadChart = function(id) {
      EagleEyeWebService.getChartById(id)
        .then(function(data) {
          controller.chart = data;
          controller.applyFilter(data.datatable);
        });
    };

    /**
     * When the auto reload switch on page is changed by user,
     * we should start or stop auto reload.
     *
     * @method
     * @param {boolean} isAutoReloadSwitchOn Indicate the switch is on or off.
     * @this ChartController
     */
    this.onAutoReloadSwitchChange = function(isAutoReloadSwitchOn) {
      if (!angular.isDefined(isAutoReloadSwitchOn)) return;

      if (isAutoReloadSwitchOn) {
        this.startAutoReloadChart();

      } else {
        this.stopAutoReloadChart();
      }
    };

    /**
     * Start to reload chart data automatically and periodically.
     * It'll make use of `DELAY` property on this controller and
     * assign the returned promise to controller's `autoReloadChartPromise`
     * property.
     *
     * @method
     * @this ChartController
     */
    this.startAutoReloadChart = function() {
      this.autoReloadChartPromise = $interval(function() {
        controller.loadChart(controller.id);
      }, this.DELAY);
    };

    /**
     * Stop to reload chart data automatically and periodically.
     *
     * @method
     * @returns {boolean} Returns `true` if it was successfully stopped.
     * @this ChartController
     */
    this.stopAutoReloadChart = function() {
      return $interval.cancel(this.autoReloadChartPromise);
    };

    /**
     * Show an sharing dialog.
     *
     * @method
     * @param {string} title The chart's title property.
     */
    this.showShare = function(title) {
      EEDialogService.showSharing({
        sharedTitle: title,
        sharedLink: $location.absUrl()
      });
    };

    /**
     * Generate download data table file link for a chart.
     *
     * @method
     * @param {string} id The chart's id.
     * @param {string} format Download file format, `xlsx` or `json`.
     * @returns {Promise} A promise will be resolved with generated
     *                    download link.
     */
    this.generateDownloadLink = function(id, format) {
      return EagleEyeWebService.getRootEndpoint()
        .then(function(rootEndpoint) {
          var link = rootEndpoint + 'api/v1/charts/' + id
                     + '/datatable?format=' + format;

          return link;
        });
    };

    /**
     * Save chart as an image.
     *
     * @method
     * @param {string} id The chart's id.
     */
    this.saveAsImage = function(id) {
      EagleEyeChartTools.saveAsImage(id);
    };

    this.filterCategory = function(dt) {
      var datatable = {};
      datatable.cols = angular.copy(dt.cols);
      datatable.rows = angular.copy(dt.rows).filter(function(row) {
        return !row.isHide;
      });

      return datatable;
    };

    this.filterColumn = function(dt) {
      var datatable = {};
      var hideIndexes = dt.cols.map(function(col, index) {
        if (col.isHide) {
          return index;

        } else {
          return -1;
        }
      });
      datatable.cols = angular.copy(dt.cols).filter(function(col) {
        return !col.isHide;
      });
      datatable.rows = angular.copy(dt.rows).map(function(row, index) {
        var c = row.c.filter(function(cell, index) {
          return hideIndexes.indexOf(index) < 0;
        });
        return { c: c };
      });

      return datatable;
    };

    this.applyFilter = function(dt) {
      // order matters
      var datatable = this.filterCategory(dt);
      datatable = this.filterColumn(datatable);
      this.filteredDatatable = datatable;
    };

    /**
     * @method
     * @this ChartController
     */
    this.init = function() {
      this.loadChart(this.id);

      // only support downloading an .xlsx file now
      this.generateDownloadLink(this.id, 'xlsx')
        .then(function(link) {
          controller.downloadLink = link;
        });
    };

    this.init();
  }
]);
