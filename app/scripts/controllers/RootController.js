'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:RootController
 * @description
 * # RootController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('RootController', [
    'EagleEyeWebService',
    'config',
    function (EagleEyeWebService, config) {
      EagleEyeWebService.setRootEndpoint(config.data.root_endpoint);
    }
  ]);
