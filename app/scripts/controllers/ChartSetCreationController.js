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
    'EagleEyeWebService',
    function (EagleEyeWebService) {
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
        console.log(chart);
        if (this.settings.charts.indexOf(chart) < 0) {
          this.settings.charts.push(chart);
        }
      }
    }
  ]);
