'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:DeletedialogcontrollerCtrl
 */
angular.module('eagleeye')
  .controller('DeleteDialogController', [
    '$mdDialog',
    'title',
    function($mdDialog, title) {
      this.title = title;

      this.cancel = function() {
        $mdDialog.cancel('cancel');
      };

      this.delete = function() {
        $mdDialog.hide('delete');
      };
    }
  ]);
