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
    'EagleEyeWebService',
    '$mdDialog',
    function($state, $stateParams, EagleEyeWebService, $mdDialog) {
      var controller = this,
        id = $stateParams.id,
        friendlyUrlPrefix = 's-';

      this.showingURL = '';

      this.settings = {};

      EagleEyeWebService.getChartSetById(id).then(function(chartSet) {
          angular.extend(controller.settings, chartSet);

          if (chartSet.friendlyUrl) {
            controller.showingURL = chartSet.friendlyUrl.substring(2);
          } else {
            controller.showingURL = '';
          }
      });

      this.deleteChart = function(id) {
        var index = this.settings.charts.indexOf(id);

        if (index > -1) {
          this.settings.charts.splice(index, 1);
        }
      };

      this.addToChartSet = function(chart) {
        if (this.settings.charts.indexOf(chart._id) < 0) {
          this.settings.charts.push(chart._id);
        }
      };
      this.updateChartSetById = function() {
        console.log("updateChartSetById()");
        var id = this.settings._id;
        this.settings.friendlyUrl = friendlyUrlPrefix + controller.showingURL;
        var updateData = this.settings;
        EagleEyeWebService.updateChartSetById(id, updateData).then(function(){
          $state.go('chartSets');
        });
      };

      EagleEyeWebService.getCharts().then(function(chartList) {
        controller.chartList = chartList;
      });
    }
  ]);
