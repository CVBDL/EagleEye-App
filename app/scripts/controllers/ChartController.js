'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartcontrollerCtrl
 * @description
 * # ChartcontrollerCtrl
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartController', [
    '$stateParams',
    function ($stateParams) {
      console.log($stateParams.id);
      this.id = $stateParams.id;
  }
]);
