'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartsController
 */
angular.module('eagleeye')

.controller('ChartsController', [
  '$state',
  'EagleEyeWebService',
  'EEDialogService',
  function($state, EagleEyeWebService, EEDialogService) {
    var controller = this;

    /** @default true */
    this.isLoading = true;

    this.displayLimit = 10;
    this.limitIncrement = 10;

    /**
     * Load chart list then set loading status and update model
     *
     * @method
     */
    this.loadChartList = function() {
      EagleEyeWebService.getCharts()
        .then(function(chartList) {
          controller.isLoading = false;
          controller.chartList = chartList;
        });
    };

    /**
     * Delete chart button on click handler.
     * It'll show a delete comfirmation dialog. User need confirm
     * delete or not.
     * If cancel delete, then do nothing.
     * If ok to delete, delete the chart and reload chart list.
     *
     * @method
     */
    this.onClickDeleteChart = function($event, chart) {
      $event.stopPropagation();

      EEDialogService
        .showDeleteConfirmation({ title: chart.options.title })
        .then(function() {
          return EagleEyeWebService.deleteChartById(chart._id);
        })
        .then(function() {
          controller.loadChartList();
        });
    };

    /**
     * @method
     */
    this.createChart = function() {
      $state.go('chartCreation');
    };

    /**
     * @method
     */
    this.loadMore = function() {
      if (controller.chartList && controller.chartList.length) {
        var length = controller.chartList.length;
        if (controller.displayLimit < length) {
          controller.displayLimit += controller.limitIncrement;
        }
      }
    };

    /**
     * @method
     * @this ChartsController
     */
    this.init = function() {
      this.loadChartList();
    };

    this.init();
  }
]);
