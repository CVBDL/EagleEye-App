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
    'title',
    function($scope, $mdDialog, title) {
      $scope.title = title;

      $scope.cancel = function() {
        $mdDialog.cancel('cancel');
      };

      $scope.delete = function() {
        $mdDialog.hide('delete');
      }
    }
  ]);
