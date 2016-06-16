'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartscontrollerCtrl
 * @description
 * # ChartscontrollerCtrl
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartsController', [
    '$http',
    function ($http) {
      var controller = this;

      $http({
        method: 'GET',
        url: 'http://10.108.182.226:3000/api/v1/charts'
      }).then(function(response) {
        controller.chartList = response.data;
      })
    }
  ]);
