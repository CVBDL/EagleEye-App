'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartController
 * @description
 * # ChartController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartController', [
    '$state',
    '$stateParams',
    '$location',
    '$interval',
    'EagleEyeWebService',
    'GoogleChartsService',
    'eeShareService',
    'eeSaveAsPDFService',
    function($state, $stateParams, $location, $interval, EagleEyeWebService, GoogleChartsService, eeShareService, eeSaveAsPDFService) {
      var controller = this,
        id = $stateParams.id,
        delay = 60 * 1000,
        autoRefreshIntervalId;

      this.chart = {};
      this.autoReloadSwitch = false;

      this.loadChart = function() {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chart = data;
        });
      };

      this.toggleAutoReloadChart = function() {
        if (this.autoReloadSwitch) {
          autoRefreshIntervalId = $interval(this.loadChart, delay);

        } else {
          $interval.cancel(autoRefreshIntervalId);
        }
      };

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.chart.options.title,
          sharedLink: $location.absUrl()
        });
      };

      this.SaveImageOrPDF = function(fileType, chart) {
        eeSaveAsPDFService.SaveImageOrPDF(fileType, chart);
      };

      function init() {
        controller.loadChart();
      }

      init();
    }
  ]);
