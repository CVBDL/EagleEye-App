'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSettingsController
 */
angular.module('eagleeye')

.controller('ChartSettingsController', [
  '$stateParams',
  'EagleEyeWebService',
  function($stateParams, EagleEyeWebService) {
    var controller = this;

    this.id = $stateParams.id;
    this.chart = {};

    /**
     * Call EagleEyeWebService service to update chart data file.
     *
     * @method
     * @param {Object} file File object.
     * @this ChartController
     */
    this.upload = function(file) {
      EagleEyeWebService.uploadFile(file, this.id);
    };

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
     * Initialize this controller
     *
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
