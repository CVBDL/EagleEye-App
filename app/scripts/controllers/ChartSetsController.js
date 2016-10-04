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
    'EagleEyeWebService',
    'eeDeleteConfirmationService',
    function($state, EagleEyeWebService, eeDeleteConfirmationService) {
      var controller = this;

      this.isLoading = true;

      this.loadChartList = function() {
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
            deleteChartSetById(id);
          }
        });
      };

      this.createChartSet = function() {
        $state.go('chartSetCreation');
      };

      function deleteChartSetById(id) {
        EagleEyeWebService.deleteChartSetById(id).then(function() {
          controller.loadChartList();
        });
      }

      function init() {
        controller.loadChartList();
      }

      init();
    }
  ]);
