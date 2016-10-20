'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartJobCreationController
 * @description
 * # ChartJobCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartJobCreationController', [
    '$state',
    '$stateParams',
    'EagleEyeWebService',
    function($state, $stateParams, EagleEyeWebService) {
      this.job = {
        enabled: true,
        name: '',
        expression: '',
        command: '',
        chartId: $stateParams.id
      };

      this.save = function() {};
    }
  ]);
