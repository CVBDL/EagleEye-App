'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartsController
 * @description
 * # ChartsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartsController', [
    '$state',
    '$mdDialog',
    '$mdMedia',
    '$http',
    'EagleEyeWebService',
    function ($state, $mdDialog, $mdMedia,$http, EagleEyeWebService) {
      var controller = this;

      this.getChartsList = function()
      {
        EagleEyeWebService.getCharts().then(function(chartList) {
          controller.chartList = chartList;
        });
      };

      controller.getChartsList();

       this.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete this chart?')
          .textContent('Please be care that if you click "Delete The Chart" the chartSets will be deleted.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete The Chart')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          controller.deleteChartById(id);
        }, function() {
        });
      };

      this.openCharts = function(id, friendlyurl){
        if(friendlyurl){
            $state.go('chart', { id: friendlyurl });
        }
        else{
            $state.go('chart', { id: id });
        }
      };

       this.deleteChartById = function(id) {
          EagleEyeWebService.deleteChartById(id).then(function() {
            controller.getChartsList();
          });
      };

    }
  ]);
