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
    '$state',
    '$stateParams',
    '$mdDialog',
    '$mdMedia',
    'EagleEyeWebService',
    function($state, $stateParams, $mdDialog, $mdMedia, EagleEyeWebService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      EagleEyeWebService.getChartById(id).then(function(data) {
        controller.chartData = data;
      });

      this.goSettings = function() {
        $state.go('chartSettings', { id: id });
      };

       this.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this chart?')
          .textContent('Please be care that if you click "Delete The Chart" the chart will be deleted.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Delete The Chart')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        controller.deleteChartById();
        }, function() {
        });
     };

      this.deleteChartById = function() {
        var id = this.chartData._id;

        EagleEyeWebService.deleteChartById(id).then(function() {
          $state.go('charts');
        });
      };
    }
  ]);
