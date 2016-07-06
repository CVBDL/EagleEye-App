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
        description: '',
        hAxisTitle: '',
        vAxisTitle: '',
        friendlyUrl: '',
        majorAxisDataType: 'string'
      };

      this.createChart = function() {
        var friendlyUrl = '';

        if (this.settings.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.settings.friendlyUrl;
        }

        var data = JSON.stringify({
          description: this.settings.description,
          chartType: this.selectedChartTypeOption.value,
          domainDataType: this.settings.majorAxisDataType,
          friendlyUrl: friendlyUrl,
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

        EagleEyeWebService.createChart(data).then(function(newChart) {
          $state.go('chart', {
            id: newChart._id
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
