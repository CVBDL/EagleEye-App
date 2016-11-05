'use strict';

/**
 * @ngdoc service
 * @name eagleeye.EEDialogService
 * @requires $q
 * @requires ngMaterial.$mdDialog
 * @requires ngMaterial.$mdMedia
 * @description Delegate for ngMaterial $mdDialog.
 */
angular.module('eagleeye')
  .factory('EEDialogService', [
    '$q',
    '$mdDialog',
    '$mdMedia',
    function ($q, $mdDialog, $mdMedia) {
      var self = {};

      /**
       * @method
       * @private
       * @name eagleeye.EEDialogService#show
       * @description Show a dialog by using $mdDialog service.
       * @param {Object} options Required options for $mdDialog.show().
       * @param {Object} options.locals An object containing key/value pairs. The keys will be used as names of values to inject into the controller.
       * @param {function|string} options.controller The controller to associate with the dialog.
       * @param {string} options.templateUrl The url of a template that will be used as the content of the dialog.
       * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or rejected with `$mdDialog.cancel()`.
       */
      self.show = function(options) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        return $mdDialog.show({
          locals: options.locals,
          controller: options.controller,
          templateUrl: options.templateUrl,
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        });
      };

      /**
       * @method
       * @name eagleeye.EEDialogService#showSharing
       * @description Show dialog for sharing.
       * @param {Object} locals An object containing key/value pairs. The keys will be used as names of values to inject into the controller.
       * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or rejected with `$mdDialog.cancel()`.
       */
      self.showSharing = function(locals) {
        return self.show({
          locals: locals,
          controller: 'ShareDialogController as ctrl',
          templateUrl: 'scripts/templates/share.tmpl.html'
        });
      };

      /**
       * @method
       * @name eagleeye.EEDialogService#showChartCreationHelping
       * @description Show dialog for helping chart creation.
       * @param {Object} locals An object containing key/value pairs. The keys will be used as names of values to inject into the controller.
       * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or rejected with `$mdDialog.cancel()`.
       */
      self.showChartCreationHelping = function(locals) {
        return self.show({
          locals: locals,
          controller: ['$scope', function($scope) {
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
          }],
          templateUrl: 'scripts/templates/chart-creation-help.tmpl.html'
        });
      };

      /**
       * @method
       * @name eagleeye.EEDialogService#showDeleteConfirmation
       * @description Show dialog for confirming delete action.
       * @param {Object} locals An object containing key/value pairs. The keys will be used as names of values to inject into the controller.
       * @returns {promise} A promise that will be resolved when click 'DELETE', rejected when click 'CANCEL'.
       */
      self.showDeleteConfirmation = function(locals) {
        return self.show({
          locals: locals,
          controller: 'DeleteDialogController as ctrl',
          templateUrl: 'scripts/templates/delete.tmpl.html'

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
