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
      var id = $stateParams.id,
        that = this;

      EagleEyeWebService.fetchChartById(id).then(function(chart) {
        that.chartInfo = chart;
      });
  }
]);
