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
      /**
       * Title of chart or chart set.
       * @type {string}
       */
      this.title = title;

      /**
       * @method
       * @name cancel
       * @description Close dialog and resolve promise with 'cancel'.
       */
      this.cancel = function() {
        $mdDialog.cancel('cancel');
      };

      /**
       * @method
       * @name delete
       * @description Close dialog and resolve promise with 'delete'.
       */
      this.delete = function() {
        $mdDialog.hide('delete');
      };
    }
  ]);
