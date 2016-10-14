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

      this.loadChartSetList = function() {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.isLoading = false;
          controller.chartSetList = chartSetList;
        });
      };

      this.onClickDeleteChartSet = function($event, chartset) {
        $event.stopPropagation();

        eeDeleteConfirmationService
          .showConfirmDialog({ title: chartset.title })
          .then(function() {
            return EagleEyeWebService.deleteChartSetById(chartset._id);
          })
          .then(function() {
            controller.loadChartSetList();
          });
      };

      this.createChartSet = function() {
        $state.go('chartSetCreation');
      };

      function init() {
        controller.loadChartSetList();
      }

      init();
    }
  ]);
