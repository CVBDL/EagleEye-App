'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartOptionsAdvanceController
 * @description
 * # ChartOptionsAdvanceController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartOptionsAdvanceController', [
    '$scope',
    '$state',
    '$stateParams',
    '$mdDialog',
    'EagleEyeWebService',
    function($scope, $state, $stateParams, $mdDialog, EagleEyeWebService) {
      var controller = this;

      controller.id = $stateParams.id;

      this.settings = '';

      this.save = function() {
        try {
          var settings = JSON.parse(controller.settings);
        } catch (e) {
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('.ui-view-container')[0]))
            .clickOutsideToClose(true)
            .title('Validation failed')
            .textContent('Input options are not a valid JSON string.')
            .ok('Got it!')
          );
        }

        EagleEyeWebService.updateChartById(controller.id, JSON.stringify(settings)).then(function() {
          $state.go('chart', {
            id: controller.id
          });

        }, function(error) {
          console.log(error);
        });
      };

      function init() {
        EagleEyeWebService.getChartById(controller.id).then(function(response) {
          controller.id = response._id;
          controller.title = response.options.title;
        });
      };

      init();
    }
  ]);
