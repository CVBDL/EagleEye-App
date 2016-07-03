'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartController
 * @description
 * # ChartController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartController', [
    '$state',
    '$stateParams',
    'EagleEyeWebService',
    function($state, $stateParams, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      EagleEyeWebService.getChartById(id).then(function(data) {
        controller.chartData = data;
      });

      this.goSettings = function() {
        $state.go('chartSettings', { id: id });
      };

      this.deleteChartById = function() {
        console.log("deleteChartById()");
        var id = this.chartData._id;
        EagleEyeWebService.deleteChartById(id).then(function() {
          $state.go('charts');
        });
      };

    }
  ]);
