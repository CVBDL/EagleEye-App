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
    '$state',
    '$stateParams',
    '$location',
    'EagleEyeWebService',
    'eeShareService',
    function($state, $stateParams, $location, EagleEyeWebService, eeShareService) {
      var controller = this,
        id = $stateParams.id;

      controller.charDataArray = [];

      this.getChartSetById = function(id) {
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
      };

      controller.getChartSetById(id);

      this.refreshChartSet = function(){
        controller.getChartSetById(id);
      };

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.settings.title,
          sharedLink: $location.absUrl()
        });
      };

      this.goToChart = function(chart) {
        var id = chart.friendlyUrl || chart._id;

        $state.go('chart', {
          id: id
        });
      }
    }
  ]);
