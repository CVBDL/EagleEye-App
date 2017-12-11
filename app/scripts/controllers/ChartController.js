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
          controller.filteredDatatable = data.datatable;
        });
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

    this.showFilter = function() {
      if (!controller.chart || !controller.chart.datatable) return;

      EEDialogService.showFilter({
        datatable: controller.chart.datatable
      }).then(function(data) {
        controller.filteredDatatable = data;
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
