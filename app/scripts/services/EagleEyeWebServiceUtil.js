'use strict';

angular.module('eagleeye')

  /**
   * @ngdoc service
   * @name eagleeye.FRIENDLY_URL_PREFIX_CHART
   *
   * @description
   * The prefix of chart `friendlyUrl` property.
   * `friendlyUrl` is unique and could be empty ''.
   * We need it to distinguish `_id` and `friendlyUrl`.
   */
  .constant('FRIENDLY_URL_PREFIX_CHART', 'c-')

  /**
   * @ngdoc service
   * @name eagleeye.FRIENDLY_URL_PREFIX_CHARTSET
   *
   * @description
   * The prefix of chart set `friendlyUrl` property.
   * `friendlyUrl` is unique and could be empty ''.
   * We need it to distinguish `_id` and `friendlyUrl`.
   */
  .constant('FRIENDLY_URL_PREFIX_CHARTSET', 's-')

  /**
   * @ngdoc service
   * @name eagleeye.EagleEyeWebServiceUtil
   * @requires eagleeye.FRIENDLY_URL_PREFIX_CHART
   * @requires eagleeye.FRIENDLY_URL_PREFIX_CHARTSET
   * @description Some util methods for working with EagleEye Rest APIs .
   */
  .factory('EagleEyeWebServiceUtil', [
    'FRIENDLY_URL_PREFIX_CHART',
    'FRIENDLY_URL_PREFIX_CHARTSET',
    function EagleEyeWebServiceUtil(FRIENDLY_URL_PREFIX_CHART, FRIENDLY_URL_PREFIX_CHARTSET) {
      var self = {};

      /**
       * @method
       * @name eagleeye.EagleEyeWebServiceUtil#makeFriendlyUrl
       *
       * @description
       * Property `friendlyUrl` is an unique field for a chart or chart set.
       * It could be empty or a string.
       * If the given `friendlyName` is empty, then the final `friendlyUrl` should be ''.
       * If the given `friendlyName` is not an empty string, then we should add the friendly URL prefix.
       *
       * @param {string} type         The friendly url types, could be 'chart' or 'chartset'.
       * @param {string} friendlyName The friendly name.
       *
       * @returns {String|Error} The final `friendlyUrl` string or error.
       *
       * @example
       * this.makeFriendlyUrl('chart', 'defects-count');    // returns 'c-defects-count'
       * this.makeFriendlyUrl('chartset', 'defects-count'); // returns 's-defects-count'
       * this.makeFriendlyUrl('foo', 'defects-count');      // returns Error
       */
      self.makeFriendlyUrl = function(type, friendlyName) {
        var prefixes = {
          chart: FRIENDLY_URL_PREFIX_CHART,
          chartset: FRIENDLY_URL_PREFIX_CHARTSET
        };

        if (!friendlyName) return '';

        if (prefixes[type]) {
          return prefixes[type] + friendlyName;

        } else {
          throw new Error(type + ' is an invalid chart type. Available types are: LineChart, ColumnChart, BarChart, ComboChart, AreaChart and ImageChart.');
        }
      };

      return self;
    }
  ]);
