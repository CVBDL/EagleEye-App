'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetController
 * @description
 * # ChartSetController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetController', [
    '$rootScope',
    '$state',
    '$stateParams',
    '$location',
    '$interval',
    'EagleEyeWebService',
    'eeShareService',
    'eeSaveAsPDFService',
    'GoogleChartsService',
    function($rootScope, $state, $stateParams, $location, $interval, EagleEyeWebService, eeShareService, eeSaveAsPDFService, GoogleChartsService) {
      var controller = this,
        id = $stateParams.id,
        delay = 60 * 1000,
        autoRefreshIntervalId;

      this.autoReloadSwitch = false;
      this.viewMode = 'list'; // or 'column'
      this.saveChartSetAsPdf = eeSaveAsPDFService.saveChartSetAsPdf;
      this.saveChartSetAsImageOrPdf = eeSaveAsPDFService.saveChartSetAsImageOrPdf;

      this.switchViewMode = function(mode) {
        this.viewMode = mode;
        $rootScope.$emit('ee.googlechart.redraw');
      };

      this.toggleAutoReloadChartSet = function() {
        if (this.autoReloadSwitch) {
          autoRefreshIntervalId = $interval(this.loadChartSet, delay);

        } else {
          $interval.cancel(autoRefreshIntervalId);
        }
      };

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.chartset.title,
          sharedLink: $location.absUrl()
        });
      };

      this.loadChartSet = function() {
        EagleEyeWebService.getChartSetById(id).then(function(chartset) {
          controller.chartset = chartset;
        });
      };

      this.loadChartSets = function() {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.chartSetList = chartSetList;
        });
      };

      this.goToChartSet = function(chartset) {
        $state.go('chartSet', { id: chartset._id });
      };

      function init() {
        controller.loadChartSet();
      }

      init();
    }
  ]);
