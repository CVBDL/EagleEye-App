'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetCreationController
 * @description
 * # ChartSetCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetCreationController', [
    '$state',
    'EagleEyeWebService',
    function ($state, EagleEyeWebService) {
      var friendlyUrlPrefix = 's-',
        controller = this;

      EagleEyeWebService.getCharts().then(function(chartList) {
        controller.chartList = chartList;
      });

      this.settings = {
        title: '',
        description: '',
        friendlyUrl: '',
        charts: []
      };

      this.addToChartSet = function(chart) {
        if (this.settings.charts.indexOf(chart._id) < 0) {
          this.settings.charts.push(chart._id);
        }
      };

      this.save = function() {
        var data = JSON.stringify(this.settings);

        EagleEyeWebService.createChartSet(data).then(function(newChartSet) {
          $state.go('chartSet', {
            id: newChartSet._id
          });
        });
      };
    }
  ]);
