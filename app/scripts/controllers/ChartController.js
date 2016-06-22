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
    '$stateParams',
    'EagleEyeWebService',
    function ($stateParams, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      EagleEyeWebService.getChartById(id).then(function(data) {
        controller.chartData = data;
      });
    }
  ]);
