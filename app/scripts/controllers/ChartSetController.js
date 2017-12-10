'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetController
 */
angular.module('eagleeye')
.controller('ChartSetController', [
  '$location',
  '$rootScope',
  '$state',
  '$stateParams',
  '$interval',
  'EagleEyeChartTools',
  'EagleEyeWebService',
  'EEDialogService',
  function($location, $rootScope, $state, $stateParams, $interval,
           EagleEyeChartTools, EagleEyeWebService, EEDialogService) {

    var controller = this;

    this.id = $stateParams.id;

    /** @constant {number} */
    this.DELAY = 60 * 1000;

    /** @default 'list' */
    this.viewMode = 'list';

    this.chartset = {};
    this.chartSetList = [];

    /**
     * Call EagleEyeWebService service to load the chart set data.
     *
     * @method
     * @param {string} id  Chart set id.
     */
    this.loadChartSet = function(id) {
      EagleEyeWebService.getChartSetById(id)
        .then(function(chartset) {
          controller.chartset = chartset;
        });
    };

    /**
     * Call EagleEyeWebService service to load the chart set list.
     *
     * @method
     */
    this.loadChartSets = function() {
      EagleEyeWebService.getChartSets()
        .then(function(chartSetList) {
          controller.chartSetList = chartSetList;
        });
    };

    /**
     * Call EagleEyeWebService service to load the chart set list.
     *
     * @method
     * @param {string} mode The charts display mode, could be
     *                      'list' or 'column'.
     */
    this.setViewMode = function(mode) {
      if (mode !== 'list' && mode !== 'column') return;

      this.viewMode = mode;
      $rootScope.$emit('ee.googlechart.redraw');
    };

    /**
     * Show an sharing dialog.
     *
     * @method
     * @param {string} title The chart set's title property.
     */
    this.showShare = function(title) {
      EEDialogService.showSharing({
        sharedTitle: title,
        sharedLink: $location.absUrl()
      });
    };

    /**
     * Save chart as an image.
     *
     * @method
     * @param {string} id The chart's id.
     */
    this.saveAsImage = function(id) {
      EagleEyeChartTools.saveAsImage(id);
    };

    /**
     * @method
     * @param {string} id The id of the chart set.
     */
    this.goToChartSet = function(id) {
      $state.go('chartSet', { id: id });
    };

    /**
     * @method
     * @this ChartSetController
     */
    this.init = function() {
      this.loadChartSet(this.id);
    };

    this.init();
  }
]);
