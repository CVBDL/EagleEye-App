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
    function($state, $mdDialog, $mdMedia, EagleEyeWebService, eeDeleteConfirmationService) {
      var controller = this;

      this.isLoading = true;

      this.getChartSetsList = function() {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.isLoading = false;
          controller.chartSetList = chartSetList;
        });
      };

      this.showConfirm = function($event, id, title) {
        $event.stopPropagation();

        eeDeleteConfirmationService.showDeleteConfirmationDialog({
          title: title
        }).then(function(response) {
          if (response === 'delete') {
            controller.deleteChartSetById(id);
          }
        });
      };

      this.openChartSets = function(id, friendlyurl) {
        if (friendlyurl) {
          $state.go('chartSet', { id: friendlyurl });
        } else {
          $state.go('chartSet', { id: id });
        }
      };

      this.deleteChartSetById = function(id) {
        EagleEyeWebService.deleteChartSetById(id).then(function() {
          controller.getChartSetsList();
        });
      };

      this.goToSettings = function($event, id, friendlyurl) {
        $event.stopPropagation();

        if (friendlyurl) {
          $state.go('chartSetSettings', { id: friendlyurl });
        } else {
          $state.go('chartSetSettings', { id: id });
        }
      };

      this.goToCreateChartSet = function() {
        $state.go('createChartSet');
      };

      this.getChartSetsList();
    }
  ]);
