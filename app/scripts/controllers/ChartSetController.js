'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetController
 * @description
 * # ChartSetController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetController', [
    '$stateParams',
    '$location',
    'EagleEyeWebService',
    'eeShareService',
    function($stateParams, $location, EagleEyeWebService, eeShareService) {
      var controller = this,
        id = $stateParams.id;

      controller.charDataArray = [];

      EagleEyeWebService.getChartSetById(id).then(function(settings) {
        controller.settings = settings;

        var chartsArray = controller.settings.charts;
        var chartCount = chartsArray.length == undefined ? 0 : chartsArray.length;

        for (var i = 0; i < chartCount; i++) {
          EagleEyeWebService.getChartById(chartsArray[i]).then(function(data) {
            controller.charDataArray.push(data);
          });
        }
      });

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.settings.title,
          sharedLink: $location.absUrl()
        });
      };
    }
  ]);
