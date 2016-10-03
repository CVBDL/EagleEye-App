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

      this.chartset = {
        title: '',
        description: '',
        friendlyUrl: '',
        searchKeyword: '',
        charts: []
      };

      this.selectedCharts = [];

      this.showingURL = '';

      this.filterFunction = function(chart) {
        return chart.options.title.indexOf(controller.chartset.searchKeyword) >= 0 ||
          chart.description.indexOf(controller.chartset.searchKeyword) >= 0;
      };

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
        var id = this.chartset._id,
          friendlyUrl = '',
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

        EagleEyeWebService.updateChartSetById(id, data).then(function() {
          $state.go('chartSets');
        });
      };

      function init() {
        var promiseChartSet = EagleEyeWebService.getChartSetById(id).then(function(chartSet) {
          angular.extend(controller.chartset, chartSet);

          if (chartSet.friendlyUrl) {
            controller.showingURL = chartSet.friendlyUrl.substring(2);
          } else {
            controller.showingURL = '';
          }
        });

        var promiseCharts = EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });

        $q.all([promiseChartSet, promiseCharts]).then(function(data) {
          if (controller.chartset.charts && controller.chartset.charts.length > 0 &&
            controller.chartList && controller.chartList.length > 0) {
            controller.chartset.charts.forEach(function(chartId) {
              controller.chartList.forEach(function(chart) {
                if (chart._id === chartId) {
                  chart.checked = true;
                  controller.selectedCharts.push(chart);
                }
              });
            });
          }
        });
      }

      init();
    }
  ]);
