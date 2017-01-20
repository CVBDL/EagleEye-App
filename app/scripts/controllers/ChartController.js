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
    'EagleEyeWebService',
    'EEDialogService',
    'SaveAsPDFService',
    function($stateParams, $location, $interval, EagleEyeWebService, EEDialogService, SaveAsPDFService) {
      var controller = this;

      this.id = $stateParams.id;

      /** @constant {number} */
      this.DELAY = 60 * 1000;

      /** @default false */
      this.isAutoReloadSwitchOn = false;

      /** @default null */
      this.autoReloadChartPromise = null;

      this.chart = {};

      /**
       * @method
       * @name loadChart
       * @description Call EagleEyeWebService service to load the chart data.
       * @param {string} id  Chart id.
       */
      this.loadChart = function(id) {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chart = data;
        });
      };

      /**
       * @method
       * @name onAutoReloadSwitchChange
       * @description
       * When the auto reload switch on page is changed by user, we should start or stop auto reload.
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
       * @method
       * @name startAutoReloadChart
       * @description
       * Start to reload chart data automatically and periodically.
       * It'll make use of `DELAY` property on this controller and assign the returned promise to
       * controller's `autoReloadChartPromise` property.
       * @this ChartController
       */
      this.startAutoReloadChart = function() {
        this.autoReloadChartPromise = $interval(function() {
          controller.loadChart(controller.id);
        }, this.DELAY);
      };

      /**
       * @method
       * @name stopAutoReloadChart
       * @description Stop to reload chart data automatically and periodically.
       * @returns {boolean} Returns `true` if it was successfully stopped.
       * @this ChartController
       */
      this.stopAutoReloadChart = function() {
        return $interval.cancel(this.autoReloadChartPromise);
      };

      /**
       * @method
       * @name showShare
       * @description Show an sharing dialog.
       * @param {string} title The chart's title property.
       */
      this.showShare = function(title) {
        EEDialogService.showSharing({
          sharedTitle: title,
          sharedLink: $location.absUrl()
        });
      };

      /**
       * @method
       * @name SaveImageOrPDF
       * @description Save chart as PDF file.
       * @param {number} fileType 0 for image, 1 for PDF.
       * @param {Object} chart The chart data.
       */
      this.saveImageOrPDF = function(fileType, chart) {
        SaveAsPDFService.saveImageOrPDF(fileType, chart);
      };

      /**
       * @method
       * @name init
       * @this ChartController
       */
      this.init = function() {
        this.loadChart(this.id);
      };

      this.init();
    }
  ]);
