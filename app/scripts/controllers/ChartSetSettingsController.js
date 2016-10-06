'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetSettingsController
 * @description
 * # ChartSetSettingsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetSettingsController', [
    '$state',
    '$stateParams',
    '$q',
    'EagleEyeWebService',
    function($state, $stateParams, $q, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id,
        friendlyUrlPrefix = 's-';

      this.searchKeyword = '';
      this.showingURL = '';
      this.chartset = {
        title: '',
        description: '',
        friendlyUrl: '',
        charts: []
      };

      this.filterFunction = function(chart) {
        return chart.options.title.indexOf(controller.searchKeyword) >= 0 ||
          chart.description.indexOf(controller.searchKeyword) >= 0;
      };

      this.onCheckboxChanged = function(chart) {
        var index = -1;

        if (chart.checked) {
          controller.chartset.charts.push(chart);

        } else {
          index = controller.chartset.charts.indexOf(chart);

          if (index > -1) {
            controller.chartset.charts.splice(index, 1);
          }
        }
      };

      this.moveUp = function(chart) {
        var index = controller.chartset.charts.indexOf(chart);

        if (index > 0) {
          controller.chartset.charts.splice(index, 1);
          controller.chartset.charts.splice(index - 1, 0, chart);
        }
      };

      this.moveDown = function(chart) {
        var index = controller.chartset.charts.indexOf(chart);

        if (index < controller.chartset.charts.length - 1) {
          controller.chartset.charts.splice(index, 1);
          controller.chartset.charts.splice(index + 1, 0, chart);
        }
      };

      this.save = function() {
        var id = this.chartset._id,
          friendlyUrl = '',
          chartIds = [];

        if (this.chartset.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.chartset.friendlyUrl;
        }

        this.chartset.charts.forEach(function(chart) {
          chartIds.push(chart._id);
        });

        var data = JSON.stringify({
          title: this.chartset.title,
          description: this.chartset.description,
          friendlyUrl: friendlyUrl,
          charts: chartIds
        });

        EagleEyeWebService.updateChartSetById(id, data).then(function() {
          $state.go('chartSets');
        });
      };

      function loadChartSet() {
        return EagleEyeWebService.getChartSetById(id).then(function(chartset) {
          controller.chartset = chartset;

          if (chartset.friendlyUrl) {
            controller.showingURL = chartset.friendlyUrl.substring(2);

          } else {
            controller.showingURL = '';
          }
        });
      }

      function loadCharts() {
        return EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });
      }

      function init() {
        $q.all([loadChartSet(), loadCharts()]).then(function() {
          controller.chartList.forEach(function(chart) {
            controller.chartset.charts.forEach(function(_chart) {
              if (chart._id === _chart._id) {
                chart.checked = true;
              }
            });
          });
        });
      }

      init();
    }
  ]);
