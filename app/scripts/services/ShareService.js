'use strict';

/**
 * @ngdoc service
 * @name eagleeye.ShareService
 * @description Sharing charts or chart sets.
 * @requires ngMaterial.$mdDialog
 * @requires ngMaterial.$mdMedia
 */
angular.module('eagleeye')
  .factory('ShareService', [
    '$mdDialog',
    '$mdMedia',
    function ($mdDialog, $mdMedia) {
      var self = {};

      /**
       * @method
       * @name eagleeye.ShareService#showShareDialog
       * @description Show a share dialog.
       * @param {Object} Custom data object.
       */
      self.showShareDialog = function(locals) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        $mdDialog.show({
          locals: locals,
          controller: 'ShareDialogController as ctrl',
          templateUrl: 'scripts/templates/share.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        });
      };

      return self
    }
  ]);
