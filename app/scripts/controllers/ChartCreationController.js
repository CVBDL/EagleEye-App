'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartCreationController
 * @description
 * # ChartCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartCreationController', [
    '$scope',
    '$http',
    '$state',
    'GoogleChartsService',
    'EagleEyeWebService',
    function ($scope, $http, $state, GoogleChartsService, EagleEyeWebService) {
      var friendlyUrlPrefix = 'c-';

      this.chartDataTableSamples = GoogleChartsService.getChartDataTableSamples();
      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      this.selectedChartTypeOption = this.chartTypeOptions[0];
      this.settings = {
        title: '',
        hAxisTitle: '',
        vAxisTitle: '',
        friendlyUrl: '',
        majorAxisDataType: 'string'
      };

      this.createChart = function() {
        var data = JSON.stringify({
          chartType: this.selectedChartTypeOption.value,
          domainDataType: this.settings.majorAxisDataType,
          friendlyUrl: friendlyUrlPrefix + this.settings.friendlyUrl,
          options: {
            title: this.settings.title,
            hAxis: {
              title: this.settings.hAxisTitle
            },
            vAxis: {
              title: this.settings.vAxisTitle
            }
          },
          datatable: this.chartDataTableSamples[this.settings.majorAxisDataType]
        });

        EagleEyeWebService.createChart(data).then(function(newChartSetId) {
          console.log(newChartSetId);

          $state.go('chartSettings', {
            id: newChartSetId
          });

        }, function(error) {
          console.log(error);
        });
      };

      this.chartOptions = {
        title: this.settings.title,
        hAxis: {
          title: this.settings.hAxisTitle
        },
        vAxis: {
          title: this.settings.vAxisTitle
        },
        width: 800,
        height: 250,
        animation: {
          duration: 500,
          easing: 'out',
          startup: true
        },
        tooltip: {
          showColorCode: true
        }
      };
    }
  ]);
