'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetsController
 * @description
 * # ChartSetsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetsController', [
    '$mdDialog',
    '$mdMedia',
    'EagleEyeWebService',
    function ($mdDialog, $mdMedia, EagleEyeWebService) {
      var controller = this;

      this.getChartSetsList = function()
      {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.chartSetList = chartSetList;
        });
      }

      controller.getChartSetsList();

      this.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete this chartSets?')
          .textContent('Please be care that if you click "Delete The ChartSets" the chartSets will be deleted.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete The ChartSets')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          controller.deleteChartSetById(id);
        }, function() {
        });
      };
      
      this.deleteChartSetById = function(id) {
          EagleEyeWebService.deleteChartSetById(id).then(function() {
            controller.getChartSetsList();
          });
      };
    }
  ]);
