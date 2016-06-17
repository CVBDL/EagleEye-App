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
    'GoogleChartsService',
    function ($scope, $http, GoogleChartsService) {
      var chartDataTableSamples = GoogleChartsService.getChartDataTableSamples();

      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();

      this.selectedChartTypeOption = this.chartTypeOptions[0];

      this.settings = {
        title: '',
        hAxisTitle: '',
        vAxisTitle: '',
        majorAxisDataType: 'string'
      };

      this.drawChart = function() {
        google.charts.setOnLoadCallback(draw.bind(this));
      };

      this.isChartCreationSuccessful = false;

      this.createChart = function() {
        $http({
          method: 'POST',
          url: '/api/v1/charts',
          data: JSON.stringify({
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
            }
          })
        }).then(function(response) {
          console.log(response);
          this.isChartCreationSuccessful = true;
        }, function(error) {
          console.log(errpr);
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
