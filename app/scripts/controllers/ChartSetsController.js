'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetsController
 * @description
 * # ChartSetsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetsController', [
    'EagleEyeWebService',
    function (EagleEyeWebService) {
      var controller = this;

      EagleEyeWebService.getChartSets().then(function(chartSetList) {
        controller.chartSetList = chartSetList;
      });
    }
  ]);
