'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetsController
 */
angular.module('eagleeye')

.controller('ChartSetsController', [
  '$state',
  'EagleEyeWebService',
  'EEDialogService',
  function($state, EagleEyeWebService, EEDialogService) {
    var controller = this;

    /** @default true */
    this.isLoading = true;

    /**
     * Load chart set list then set loading status and update model
     *
     * @method
     */
    this.loadChartSetList = function() {
      EagleEyeWebService.getChartSets().then(function(chartSetList) {
        controller.isLoading = false;
        controller.chartSetList = chartSetList;
      });
    };

    /**
     * Delete chart set button on click handler.
     * It'll show a delete comfirmation dialog. User need confirm
     * delete or not.
     * If cancel delete, then do nothing.
     * If ok to delete, delete the chart set and reload chart set list.
     *
     * @method
     */
    this.onClickDeleteChartSet = function($event, chartset) {
      $event.stopPropagation();

      EEDialogService
        .showDeleteConfirmation({ title: chartset.title })
        .then(function() {
          return EagleEyeWebService.deleteChartSetById(chartset._id);
        })
        .then(function() {
          controller.loadChartSetList();
        });
    };

    /**
     * @method
     */
    this.createChartSet = function() {
      $state.go('chartSetCreation');
    };

    /**
     * @method
     * @this ChartSetsController
     */
    this.init = function() {
      this.loadChartSetList();
    };

    this.init();
  }
]);
