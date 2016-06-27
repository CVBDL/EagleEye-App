'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:AppcontrollerCtrl
 * @description
 * # AppcontrollerCtrl
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('AppController', function ($scope) {
    $scope.currentNavItem = 'page1';
  });
