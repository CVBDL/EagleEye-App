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
    'EagleEyeWebService',
    'eeShareService',
    function($state, $stateParams, $location, EagleEyeWebService, eeShareService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      this.getChartDataById = function(id) {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chartData = data;
        });
      };

      controller.getChartDataById(id);

      this.goSettings = function() {
        $state.go('chartSettings', { id: id });
      };

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.chartData.options.title,
          sharedLink: $location.absUrl()
        });
      };

      this.refreshChart = function() {
        var id = this.chartData._id;
        controller.getChartDataById(id);
      };
    }
  ]);
