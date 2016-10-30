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

      /**
       * @method
       * @name loadChartList
       * @description Load chart list then set loading status and update model
       */
      this.loadChartList = function() {
        EagleEyeWebService.getCharts().then(function(chartList) {
          controller.isLoading = false;
          controller.chartList = chartList;
        });
      };

      /**
       * @method
       * @name onClickDeleteChart
       *
       * @description
       * Delete chart button on click handler.
       * It'll show a delete comfirmation dialog. User need confirm delete or not.
       * If cancel delete, then do nothing.
       * If ok to delete, delete the chart and reload chart list.
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
       * @name createChart
       */
      this.createChart = function() {
        $state.go('chartCreation');
      };

      /**
       * @method
       * @name init
       * @this ChartsController
       */
      this.init = function() {
        this.loadChartList();
      };

      this.init();
    }
  ]);
