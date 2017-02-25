'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartOptionsAdvanceController
 */
angular.module('eagleeye')

.controller('ChartOptionsAdvanceController', [
  '$state',
  '$stateParams',
  '$window',
  'EagleEyeWebService',
  function($state, $stateParams, $window, EagleEyeWebService) {
    var controller = this;

    this.id = $stateParams.id;
    this.chartOptionsString = '';
    this.title = '';

    /**
     * Save the chart updates.
     *
     * @method
     * @param {string} chartOptionsString The chart data model JSON
     *                                    string format.
     */
    this.save = function(chartOptionsString) {
      try {
        var payload = JSON.parse(chartOptionsString);
      } catch (e) {
        $window.alert('JSON syntax error!');
        return;
      }

      EagleEyeWebService.updateChartById(controller.id, payload)
        .then(function() {
          $state.go('chart', {
            id: controller.id
          });
        });
    };

    /**
     * Initialize this controller
     *
     * @method
     */
    this.init = function() {
      EagleEyeWebService.getChartById(controller.id)
        .then(function(response) {
          controller.id = response._id;
          controller.title = response.options.title;
          controller.chartOptionsString = JSON.stringify({
            options: response.options
          });
        });
    };

    this.init();
  }
]);
