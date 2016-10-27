'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetsController
 */
angular.module('eagleeye')
  .controller('ChartSetsController', [
    '$state',
    'EagleEyeWebService',
    'eeDeleteConfirmationService',
    function($state, EagleEyeWebService, eeDeleteConfirmationService) {
      var controller = this;

      /** @default true */
      this.isLoading = true;

      /**
       * @method
       * @name loadChartSetList
       * @description Load chart set list then set loading status and update model
       */
      this.loadChartSetList = function() {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.isLoading = false;
          controller.chartSetList = chartSetList;
        });
      };

      /**
       * @method
       * @name onClickDeleteChartSet
       *
       * @description
       * Delete chart set button on click handler.
       * It'll show a delete comfirmation dialog. User need confirm delete or not.
       * If cancel delete, then do nothing.
       * If ok to delete, delete the chart set and reload chart set list.
       */
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

      /**
       * @method
       * @name createChartSet
       */
      this.createChartSet = function() {
        $state.go('chartSetCreation');
      };

      /**
       * @method
       * @name init
       * @this ChartSetsController
       */
      this.init = function() {
        this.loadChartSetList();
      };

      this.init();
    }
  ]);
