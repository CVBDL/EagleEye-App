'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartsController
 * @description
 * # ChartsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartsController', [
    '$http',
    'EagleEyeWebService',
    function ($http, EagleEyeWebService) {
      var controller = this;

      EagleEyeWebService.getCharts().then(function(chartList) {
        controller.chartList = chartList;
      });
    }
  ]);
