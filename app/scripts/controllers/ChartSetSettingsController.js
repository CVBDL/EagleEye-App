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
    '$mdDialog',
    function($state, $stateParams, $q, EagleEyeWebService, $mdDialog) {
      var controller = this,
        id = $stateParams.id,
        friendlyUrlPrefix = 's-';

      this.showingURL = '';
      this.settings = {};
      this.selectedCharts = [];

      var promiseChartSet = EagleEyeWebService.getChartSetById(id).then(function(chartSet) {
        angular.extend(controller.settings, chartSet);

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
        if (controller.settings.charts && controller.settings.charts.length > 0 &&
          controller.chartList && controller.chartList.length > 0) {
          controller.chartList.forEach(function(chart) {
            controller.settings.charts.forEach(function(chartId) {
              if (chart._id === chartId) {
                chart.checked = true;
                controller.selectedCharts.push(chart);
              }
            });
          });
        }
      });

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
        var id = this.settings._id,
          friendlyUrl = '',
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

        EagleEyeWebService.updateChartSetById(id, data).then(function() {
          $state.go('chartSets');
        });
      };
    }
  ]);
