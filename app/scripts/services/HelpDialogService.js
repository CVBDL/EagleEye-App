'use strict';

/**
 * @ngdoc service
 * @name eagleeye.HelpDialogService
 * @description Display helping messages.
 * @requires ngMaterial.$mdDialog
 */
angular.module('eagleeye')
  .factory('HelpDialogService', [
    '$mdDialog',
    function HelpDialogService($mdDialog) {
      var self = {};

      /**
       * @method
       * @name eagleeye.HelpDialogService#showHelp
       * @description Show an help dialog.
       */
      self.showHelp = function() {
        $mdDialog.show({
          templateUrl: 'scripts/templates/chart-creation-help.tmpl.html',
          controller: ['$scope', function($scope) {
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
          }],
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };

      return self;
    }
  ]);
