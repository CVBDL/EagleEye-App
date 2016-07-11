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
    '$state',
    '$mdDialog',
    '$mdMedia',
    'EagleEyeWebService',
    'eeDeleteConfirmationService',
    function ($state, $mdDialog, $mdMedia, EagleEyeWebService, eeDeleteConfirmationService) {
      var controller = this;

      this.getChartSetsList = function()
      {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.chartSetList = chartSetList;
        });
      }

      controller.getChartSetsList();

      this.showConfirm = function(ev, id) {
        eeDeleteConfirmationService.showDeleteConfirmationDialog().then(function(response) {
          if (response === 'delete') {
            controller.deleteChartSetById(id);
          }
        });
      };

      this.openChartSets = function(id, friendlyurl){
        if(friendlyurl){
            $state.go('chartSet', { id: friendlyurl });
        }
        else{
            $state.go('chartSet', { id: id });
        }
      };

      this.deleteChartSetById = function(id) {
          EagleEyeWebService.deleteChartSetById(id).then(function() {
            controller.getChartSetsList();
          });
      };
    }
  ]);
