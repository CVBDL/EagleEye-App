'use strict';

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeWebService
 * @description
 * # EagleEyeWebService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .provider('EagleEyeWebService', function EagleEyeWebServiceProvider() {
    this.webServiceBaseUrl = '';

    this.$get = [
      '$http',
      function EagleEyeWebService($http) {


        return  {};
      }
    ];
  });
