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
    function ($http) {
      var controller = this;

      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/charts'
      }).then(function(response) {
        controller.chartList = response.data;
      })
    }
  ]);
