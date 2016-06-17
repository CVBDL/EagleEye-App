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
      var chartDataTableSamples = GoogleChartsService.getChartDataTableSamples(),
        controller = this;

      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      this.selectedChartTypeOption = this.chartTypeOptions[0];
      this.isChartCreationSuccessful = false;
      this.settings = {
        title: '',
        hAxisTitle: '',
        vAxisTitle: '',
        majorAxisDataType: 'string'
      };

      this.drawChart = function() {
        google.charts.setOnLoadCallback(draw.bind(this));
      };

      this.createChart = function() {
        var data = JSON.stringify({
          chartType: this.selectedChartTypeOption.value,
          domainDataType: this.settings.majorAxisDataType,
          options: {
            title: this.settings.title,
            hAxis: {
              title: this.settings.hAxisTitle
            },
            vAxis: {
              title: this.settings.vAxisTitle
            }
          },
          datatables: chartDataTableSamples[this.settings.majorAxisDataType]
        });

        EagleEyeWebService.createChart(data).then(function(newCharId) {
          console.log(newCharId);

          $state.go('chartSettings', {
            id: newCharId
          });

        }, function(error) {
          console.log(error);
        });
      };

      function draw() {
        var chart = new google.visualization[this.selectedChartTypeOption.construcorName](document.getElementById('preview'));
        chart.draw(new google.visualization.DataTable(chartDataTableSamples[this.settings.majorAxisDataType]), {
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
        });
      }
  }]);
