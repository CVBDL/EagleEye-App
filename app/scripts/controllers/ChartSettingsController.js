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
       * @method
       * @name upload
       * @description Call EagleEyeWebService service to update chart data file.
       * @param {Object} file File object.
       * @this ChartController
       */
      this.upload = function(file) {
        EagleEyeWebService.uploadFile(file, this.chart.type, this.id);
      };

      /**
       * @method
       * @name loadChart
       * @description Call EagleEyeWebService service to load the chart data.
       * @param {string} id The chart's id or friendlyUrl.
       */
      this.loadChart = function(id) {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chart = data;
        });
      };

      /**
       * @method
       * @name init
       * @description Initialize this controller
       * @this ChartController
       */
      this.init = function() {
        this.loadChart(this.id);
      };

      this.init();
    }
  ]);
