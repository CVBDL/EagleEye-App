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
     * Initialize this controller
     *
     * @method
     * @this ChartController
     */
    this.init = function() {
      this.loadChart(this.id);
    };

    this.init();
  }
]);
