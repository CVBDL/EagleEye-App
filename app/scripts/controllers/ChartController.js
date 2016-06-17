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
      var id = $stateParams.id,
        chartData;

      EagleEyeWebService.fetchChartById(id).then(function(data) {
        chartData = data;
        google.charts.setOnLoadCallback(draw.bind(this));
      });

      function draw() {
        var chart = new google.visualization[chartData.chartType](document.getElementById('preview'));
        var datatables = new google.visualization.DataTable(chartData.datatables);
        var options = chartData.options;

        chart.draw(datatables, options);
      }
    }
  ]);
