'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ShareDialogController
 * @description
 * # ShareDialogController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ShareDialogController', [
    '$scope',
    '$mdDialog',
    'sharedTitle',
    'sharedLink',
    function($scope, $mdDialog, sharedTitle, sharedLink) {
      $scope.mailTemplate =
        'mailto:?subject=Share: ' + sharedTitle + '&body=' + sharedLink + '%0d Shared from EagleEye';

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
  ]);
