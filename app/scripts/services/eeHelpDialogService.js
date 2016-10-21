'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeHelpDialogService
 * @description
 * # eeHelpDialogService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('eeHelpDialogService', [
    '$mdDialog',
    function eeHelpDialogService($mdDialog) {

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
