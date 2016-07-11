'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:DeletedialogcontrollerCtrl
 * @description
 * # DeletedialogcontrollerCtrl
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('DeleteDialogController', [
    '$scope',
    '$mdDialog',
    function($scope, $mdDialog) {
      $scope.cancel = function() {
        $mdDialog.cancel('cancel');
      };

      $scope.delete = function() {
        $mdDialog.hide('delete');
      }
    }
  ]);
