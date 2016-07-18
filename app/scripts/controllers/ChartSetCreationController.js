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
        searchKeyword: '',
        charts: []
      };

      this.selectedCharts = [];

      this.filterFunction = function(chart) {
        return chart.options.title.indexOf(controller.settings.searchKeyword) >= 0 ||
          chart.description.indexOf(controller.settings.searchKeyword) >= 0;
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

        if (this.settings.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.settings.friendlyUrl;
        }

        this.selectedCharts.forEach(function(chart) {
          chartIds.push(chart._id);
        });

        var data = JSON.stringify({
          title: this.settings.title,
          description: this.settings.description,
          friendlyUrl: friendlyUrl,
          charts: chartIds
        });

        EagleEyeWebService.createChartSet(data).then(function(newChartSet) {
          $state.go('chartSet', {
            id: newChartSet._id
          });
        });
      };
    }
  ]);
