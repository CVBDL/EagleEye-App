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
    '$stateParams',
    'EagleEyeWebService',
    '$mdDialog',
    function ($stateParams, EagleEyeWebService,$mdDialog) {
      var controller = this,
        id = $stateParams.id;

      this.settings = {};

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
          var updateData = this.settings;
          EagleEyeWebService.updateChartSetById(id,updateData);
      }      
      this.deleteChartSetById = function() {
          console.log("deleteChartSetById()");
          var id = this.settings._id;
          EagleEyeWebService.deleteChartSetById(id).then(function() {
            alert("Success");
        });
      }

      var that = this ;
      this.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete this chart?')
              .textContent('If you click Delete button, this chart will be delete and cannot restored!')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Delete')
              .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
             that.deleteChartSetById();
        }, function() {
             console.log("Cancel!");
        });
      };

      EagleEyeWebService.getChartSetById(id).then(function(chartSet) {
        angular.extend(controller.settings, chartSet);
        controller.settings.friendlyUrl = chartSet.friendlyUrl.substring(2);
      });

      EagleEyeWebService.getCharts().then(function(chartList) {
        controller.chartList = chartList;
      });
    }
  ]);
