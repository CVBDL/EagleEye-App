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
       * @method
       * @name loadChartSet
       * @description Call EagleEyeWebService service to load the chart set data.
       * @param {string} id  Chart set id.
       */
      this.loadChartSet = function(id) {
        EagleEyeWebService.getChartSetById(id).then(function(chartset) {
          controller.chartset = chartset;
        });
      };

      /**
       * @method
       * @name loadChartSets
       * @description Call EagleEyeWebService service to load the chart set list.
       */
      this.loadChartSets = function() {
        EagleEyeWebService.getChartSets().then(function(chartSetList) {
          controller.chartSetList = chartSetList;
        });
      };

      /**
       * @method
       * @name setViewMode
       * @description Call EagleEyeWebService service to load the chart set list.
       * @param {string} mode The charts display mode, could be 'list' or 'column'.
       */
      this.setViewMode = function(mode) {
        if (mode !== 'list' && mode !== 'column') return;

        this.viewMode = mode;
        $rootScope.$emit('ee.googlechart.redraw');
      };

      /**
       * @method
       * @name onAutoReloadSwitchChange
       * @description
       * When the auto reload switch on page is changed by user, we should start or stop auto reload.
       * @param {boolean} isAutoReloadSwitchOn Indicate the switch is on or off.
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
       * @method
       * @name startAutoReloadChartSet
       * @description
       * Start to reload chart set data automatically and periodically.
       * It'll make use of `DELAY` property on this controller and assign the returned promise to
       * controller's `autoReloadChartSetPromise` property.
       * @this ChartSetController
       */
      this.startAutoReloadChartSet = function() {
        this.autoReloadChartSetPromise = $interval(function() {
          controller.loadChartSet(controller.id);
        }, this.DELAY);
      };

      /**
       * @method
       * @name stopAutoReloadChartSet
       * @description Stop to reload chart set data automatically and periodically.
       * @returns {boolean} Returns `true` if it was successfully stopped.
       * @this ChartSetController
       */
      this.stopAutoReloadChartSet = function() {
        return $interval.cancel(this.autoReloadChartSetPromise);
      };

      /**
       * @method
       * @name showShare
       * @description Show an sharing dialog.
       * @param {string} title The chart set's title property.
       */
      this.showShare = function(title) {
        EEDialogService.showSharing({
          sharedTitle: title,
          sharedLink: $location.absUrl()
        });
      };

      /**
       * @method
       * @description Save chart as an image.
       * @param {string} id The chart's id.
       */
      this.saveAsImage = function(id) {
        EagleEyeChartTools.saveAsImage(id);
      };

      /**
       * @method
       * @name goToChartSet
       * @param {string} id The id of the chart set.
       */
      this.goToChartSet = function(id) {
        $state.go('chartSet', { id: id });
      };

      /**
       * @method
       * @name init
       * @this ChartSetController
       */
      this.init = function() {
        this.loadChartSet(this.id);
      };

      this.init();
    }
  ]);
