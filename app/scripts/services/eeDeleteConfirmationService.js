'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeDeleteConfirmationService
 * @description
 * # eeDeleteConfirmationService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('eeDeleteConfirmationService', [
    '$mdDialog',
    '$mdMedia',
    function ($mdDialog, $mdMedia) {

      function showDeleteConfirmationDialog(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        return $mdDialog.show({
          locals: locals,
          controller: 'DeleteDialogController',
          templateUrl: 'scripts/templates/delete.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        });
      }

      return {
        showDeleteConfirmationDialog: showDeleteConfirmationDialog
      };
    }
  ]);
