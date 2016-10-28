'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeShareService
 * @description
 * # eeShareService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('eeShareService', [
    '$mdDialog',
    '$mdMedia',
    function ($mdDialog, $mdMedia) {
      /**
       * @function
       * @name showShareDialog
       * @description Show a share dialog.
       * @param {Object} Custom data object.
       */
      function showShareDialog(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        $mdDialog.show({
          locals: locals,
          controller: 'ShareDialogController as ctrl',
          templateUrl: 'scripts/templates/share.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        });
      }

      return {
        showShareDialog: showShareDialog
      };
    }
  ]);
