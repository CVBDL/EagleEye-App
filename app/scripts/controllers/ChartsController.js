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
    'EagleEyeWebService',
    'eeDeleteConfirmationService',
    function($state, EagleEyeWebService, eeDeleteConfirmationService) {
      var controller = this;

      this.isLoading = true;

      this.loadChartList = function() {
        EagleEyeWebService.getCharts().then(function(chartList) {
          controller.isLoading = false;
          controller.chartList = chartList;
        });
      };

      this.onClickDeleteChart = function($event, chart) {
        $event.stopPropagation();

        eeDeleteConfirmationService
          .showConfirmDialog({ title: chart.options.title })
          .then(function() {
            return EagleEyeWebService.deleteChartById(chart._id);
          })
          .then(function() {
            controller.loadChartList();
          });
      };

      this.createChart = function() {
        $state.go('chartCreation');
      };

      function init() {
        controller.loadChartList();
      }

      init();
    }
  ]);
