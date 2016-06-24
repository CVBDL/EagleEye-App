'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetController
 * @description
 * # ChartSetController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetController', [
    '$stateParams',
    'EagleEyeWebService',
    function ($stateParams, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id;

      EagleEyeWebService.getChartSetById(id).then(function(settings) {
        controller.settings = settings;
      });
    }
  ]);
