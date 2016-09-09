'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:AppController
 * @description
 * # AppController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('AppController', [
    '$scope',
    'FEEDBACK_EMAIL',
    function ($scope, FEEDBACK_EMAIL) {
      $scope.feedbackLink = "mailto:"+ FEEDBACK_EMAIL + "?subject=EagleEye+Feedback";
    }
  ]);
