'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:DeleteDialogController
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
       * @description Hide dialog and reject the promise returned from $mdDialog.show().
       */
      this.cancel = function() {
        $mdDialog.cancel();
      };

      /**
       * @method
       * @name delete
       * @description Hide dialog and resolve promise returned from $mdDialog.show().
       */
      this.delete = function() {
        $mdDialog.hide();
      };
    }
  ]);
