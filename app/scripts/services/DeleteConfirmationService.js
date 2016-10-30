'use strict';

/**
 * @ngdoc service
 * @name eagleeye.DeleteConfirmationService
 * @description
 *
 * Show a confirmation dialog with 'DELETE' and 'CANCEL' options.
 * Returns the response when user make a choice.
 *
 * @requires $q
 * @requires ngMaterial.$mdDialog
 * @requires ngMaterial.$mdMedia
 */
angular.module('eagleeye')
  .factory('DeleteConfirmationService', [
    '$q',
    '$mdDialog',
    '$mdMedia',
    function ($q, $mdDialog, $mdMedia) {
      var self = {};

      /**
       * @method
       * @name eagleeye.DeleteConfirmationService#showConfirmDialog
       * @description Show a confirmation dialog and reponse base on user action.
       * @param {Object} Custom data object.
       * @returns {Promise}
       */
      self.showConfirmDialog = function(locals) {
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
      };

      return self;
    }
  ]);
