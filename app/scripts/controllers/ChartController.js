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
    '$stateParams',
    'EagleEyeWebService',
    function ($stateParams, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      EagleEyeWebService.getChartById(id).then(function(data) {
        controller.chartData = data;
      });
      this.deleteChartById = function() {
        console.log("deleteChartById()");
        var id = this.chartData._id;
        EagleEyeWebService.deleteChartById(id).then(function() {
          alert("Please goto--> Dashboard");
      });
      }
    }
  ]);
