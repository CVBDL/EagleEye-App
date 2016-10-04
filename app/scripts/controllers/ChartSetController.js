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

      this.charDataArray = [];
      this.autoReloadSwitch = false;
      this.imageChartBaseUrl = '';
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
          sharedTitle: this.settings.title,
          sharedLink: $location.absUrl()
        });
      };

      this.loadChartSet = function() {
        controller.charDataArray = [];
        EagleEyeWebService.getChartSetById(id).then(function(settings) {
          controller.settings = settings;

          var chartsArray = controller.settings.charts;
          var chartCount = chartsArray.length == undefined ? 0 : chartsArray.length;

          for (var i = 0; i < chartCount; i++) {
            (function(i) {
              EagleEyeWebService.getChartById(chartsArray[i]).then(function(data) {
                controller.charDataArray[i] = data;
              });
            })(i);
          }
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

      this.getExcelTemplateDownloadUrl = function(id) {
        return EagleEyeWebService.getExcelTemplateDownloadUrl(id);
      };

      function init() {
        controller.loadChartSet();
        controller.imageChartBaseUrl = EagleEyeWebService.getStaticServerSideImageBaseUrl();
      }

      init();
    }
  ]);
