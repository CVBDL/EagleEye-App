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

      this.showConfirm = function($event, id, title) {
        $event.stopPropagation();

        eeDeleteConfirmationService.showDeleteConfirmationDialog({
          title: title

        }).then(function(response) {
          if (response === 'delete') {
            deleteChartById(id);
          }
        });
      };

      function deleteChartById(id) {
        EagleEyeWebService.deleteChartById(id).then(function() {
          controller.loadChartList();
        });
      }

      function init() {
        controller.loadChartList();
      }

      init();
    }
  ]);
