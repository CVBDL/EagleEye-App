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

    /** @default false */
    this.isAutoReloadSwitchOn = false;

    /** @default null */
    this.autoReloadChartSetPromise = null;

    this.chartset = {};
    this.chartSetList = [];

    /**
     * Call EagleEyeWebService service to load the chart set data.
     *
     * @method
     * @param {string} id  Chart set id.
     */
    this.loadChartSet = function(id) {
      EagleEyeWebService.getChartSetById(id).then(function(chartset) {
        controller.chartset = chartset;
      });
    };

    /**
     * Call EagleEyeWebService service to load the chart set list.
     *
     * @method
     */
    this.loadChartSets = function() {
      EagleEyeWebService.getChartSets().then(function(chartSetList) {
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
     * When the auto reload switch on page is changed by user,
     * we should start or stop auto reload.
     *
     * @method
     * @param {boolean} isAutoReloadSwitchOn Indicate the switch is
     *                                       on or off.
     * @this ChartSetController
     */
    this.onAutoReloadSwitchChange = function(isAutoReloadSwitchOn) {
      if (!angular.isDefined(isAutoReloadSwitchOn)) return;

      if (isAutoReloadSwitchOn) {
        this.startAutoReloadChartSet();

      } else {
        this.stopAutoReloadChartSet();
      }
    };

    /**
     * Start to reload chart set data automatically and periodically.
     * It'll make use of `DELAY` property on this controller and
     * assign the returned promise to
     * controller's `autoReloadChartSetPromise` property.
     *
     * @method
     * @this ChartSetController
     */
    this.startAutoReloadChartSet = function() {
      this.autoReloadChartSetPromise = $interval(function() {
        controller.loadChartSet(controller.id);
      }, this.DELAY);
    };

    /**
     * Stop to reload chart set data automatically and periodically.
     *
     * @method
     * @returns {boolean} Returns `true` if it was successfully stopped.
     * @this ChartSetController
     */
    this.stopAutoReloadChartSet = function() {
      return $interval.cancel(this.autoReloadChartSetPromise);
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
