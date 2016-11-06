'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ShareDialogController
 */
angular.module('eagleeye')
  .controller('ShareDialogController', [
    '$mdDialog',
    'sharedTitle',
    'sharedLink',
    function($mdDialog, sharedTitle, sharedLink) {

      /** @type {string} */
      this.mailTemplate =
        'mailto:?subject=Share: ' + sharedTitle + '&body=' + sharedLink + '%0d Shared from EagleEye';

      /**
       * @method
       * @name cancel
       * @description Hide dialog and reject the promise returned from $mdDialog.show().
       */
      this.cancel = function() {
        $mdDialog.cancel();
      };
    }
  ]);
