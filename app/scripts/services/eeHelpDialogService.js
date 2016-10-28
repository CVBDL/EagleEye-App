'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeHelpDialogService
 */
angular.module('eagleeye')
  .factory('eeHelpDialogService', [
    '$mdDialog',
    function eeHelpDialogService($mdDialog) {
      /**
       * @function
       * @name showHelp
       * @description Show an help dialog.
       */
      function showHelp() {
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
      }

      return {
        showHelp: showHelp
      };
    }
  ]);
