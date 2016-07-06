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

      function showShareDialog(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        $mdDialog.show({
          locals: locals,
          controller: 'ShareDialogController',
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
