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
      var controller = this,
        friendlyUrlPrefix = 's-';

      this.chartset = {
        title: '',
        description: '',
        friendlyUrl: '',
        searchKeyword: '',
        charts: []
      };

      this.selectedCharts = [];

      this.filterFunction = function(chart) {
        return chart.options.title.indexOf(controller.chartset.searchKeyword) >= 0 ||
          chart.description.indexOf(controller.chartset.searchKeyword) >= 0;
      }

      this.onCheckboxChanged = function(chart) {
        var index = -1;

        if (chart.checked) {
          controller.selectedCharts.push(chart);

        } else {
          index = controller.selectedCharts.indexOf(chart);

          if (index > -1) {
            controller.selectedCharts.splice(index, 1);
          }
        }
      };

      this.moveUp = function(chart) {
        var index = controller.selectedCharts.indexOf(chart);

        if (index > 0) {
          controller.selectedCharts.splice(index, 1);
          controller.selectedCharts.splice(index - 1, 0, chart);
        }
      };

      this.moveDown = function(chart) {
        var index = controller.selectedCharts.indexOf(chart);

        if (index < controller.selectedCharts.length - 1) {
          controller.selectedCharts.splice(index, 1);
          controller.selectedCharts.splice(index + 1, 0, chart);
        }
      };

      this.save = function() {
        var friendlyUrl = '',
          chartIds = [];

        if (this.chartset.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.chartset.friendlyUrl;
        }

        this.selectedCharts.forEach(function(chart) {
          chartIds.push(chart._id);
        });

        var data = JSON.stringify({
          title: this.chartset.title,
          description: this.chartset.description,
          friendlyUrl: friendlyUrl,
          charts: chartIds
        });

        EagleEyeWebService.createChartSet(data).then(function(newChartSet) {
          $state.go('chartSet', {
            id: newChartSet._id
          });
        });
      };

      function loadChartList() {
        EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });
      }

      function init() {
        loadChartList();
      }

      init();
    }
  ]);
