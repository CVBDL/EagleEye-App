'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeDeleteConfirmationService
 */
angular.module('eagleeye')
  .factory('eeDeleteConfirmationService', [
    '$q',
    '$mdDialog',
    '$mdMedia',
    function ($q, $mdDialog, $mdMedia) {

      /**
       * @function
       * @name showConfirmDialog
       * @description Show a confirmation dialog and reponse base on user action.
       * @param {Object} Custom data object.
       * @returns {Promise}
       */
      function showConfirmDialog(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        return $mdDialog.show({
          locals: locals,
          controller: 'DeleteDialogController as ctrl',
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
