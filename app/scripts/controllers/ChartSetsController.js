'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetsController
 * @description
 * # ChartSetsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetsController', [
    'EagleEyeWebService',
    function (EagleEyeWebService) {
      var controller = this;

      EagleEyeWebService.getChartSets().then(function(chartSetList) {
        controller.chartSetList = chartSetList;
      });

      this.deleteChartSetById = function(id) {
          console.log("deleteChartSetById()");
          EagleEyeWebService.deleteChartSetById(id).then(function() {
            alert("Success");
        });
      }

    }
  ]);
