'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:HomeController
 * @description
 * # HomeController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('HomeController', [
    '$state',
    function ($state) {
      this.goToDevelop = function() {
        $state.go('develop');
      };
    }
  ]);
