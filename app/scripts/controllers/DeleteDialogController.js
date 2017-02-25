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
     * Hide dialog and reject the promise returned from $mdDialog.show().
     *
     * @method
     */
    this.cancel = function() {
      $mdDialog.cancel();
    };

    /**
     * Hide dialog and resolve promise returned from $mdDialog.show().
     *
     * @method
     */
    this.delete = function() {
      $mdDialog.hide();
    };
  }
]);
