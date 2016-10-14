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
    '$q',
    '$mdDialog',
    '$mdMedia',
    function ($q, $mdDialog, $mdMedia) {

      function showConfirmDialog(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        return $mdDialog.show({
          locals: locals,
          controller: 'DeleteDialogController',
          templateUrl: 'scripts/templates/delete.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen

        }).then(function(response) {
          if (response === 'delete') {
            return $q.when(response);
          } else {
            return $q.reject(response);
          }
        });
      }

      return {
        showConfirmDialog: showConfirmDialog
      };
    }
  ]);
