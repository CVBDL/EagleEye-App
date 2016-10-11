'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSettingsController
 * @description
 * # ChartSettingsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSettingsController', [
    '$state',
    '$stateParams',
    'EagleEyeWebService',
    function ($state, $stateParams, EagleEyeWebService) {
      var controller = this,
        id = controller.id = $stateParams.id;

      this.chart = {};
      this.isLoading = true;

      this.upload = function (file) {
        EagleEyeWebService.uploadFile(file, controller.chart.type, controller.id);
      };

      function loadChart() {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.isLoading = false;
          controller.chart = data;
        });
      }

      function init() {
        loadChart();
      }

      init();
    }
  ]);
