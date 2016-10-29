'use strict';

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeWebService
 * @description
 * # EagleEyeWebService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')

  /**
   * @ngdoc service
   * @name FRIENDLY_URL_PREFIX_CHART
   *
   * @description
   * The prefix of chart `friendlyUrl` property.
   * `friendlyUrl` is unique and could be empty ''.
   * We need it to distinguish `_id` and `friendlyUrl`.
   */
  .constant('FRIENDLY_URL_PREFIX_CHART', 'c-')

  /**
   * @ngdoc service
   * @name FRIENDLY_URL_PREFIX_CHARTSET
   *
   * @description
   * The prefix of chart set `friendlyUrl` property.
   * `friendlyUrl` is unique and could be empty ''.
   * We need it to distinguish `_id` and `friendlyUrl`.
   */
  .constant('FRIENDLY_URL_PREFIX_CHARTSET', 's-')

  .factory('EagleEyeWebService', [
    '$http',
    '$q',
    'Upload',
    'FRIENDLY_URL_PREFIX_CHART',
    'FRIENDLY_URL_PREFIX_CHARTSET',
    function EagleEyeWebService($http, $q, Upload, FRIENDLY_URL_PREFIX_CHART, FRIENDLY_URL_PREFIX_CHARTSET) {
      var self = {};

      var isRootEndpointInitialized = false,
        rootEndpoint = '';

      self.getRootEndpoint = function() {
        if (isRootEndpointInitialized) {
          return $q.when(rootEndpoint);

        } else {
          return $http.get('../config.json').then(function(response) {
            isRootEndpointInitialized = true;
            rootEndpoint = response.data.root_endpoint;

            return rootEndpoint;
          });
        }
      };

      self.fetchServer = function(options) {
        return self.getRootEndpoint().then(function(rootEndpoint) {
          options.url = rootEndpoint + 'api/v1/' + options.url;

            return $http(options).then(function(response) {
              return response.data;
            });
        });
      };

      self.getCharts = function() {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-all-charts
        // GET /api/v1/charts
        var url = 'charts';

        return self.fetchServer({
          method: 'GET',
          url: url
        });
      };

      self.getChartById = function(id) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-one-chart
        // GET /api/v1/charts/:_id
        var url = 'charts/' + id;

        return self.fetchServer({
          method: 'GET',
          url: url
        });
      };

      self.createChart = function(data) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-new-chart
        // POST /api/v1/charts
        var url = 'charts';

        return self.fetchServer({
          method: 'POST',
          url: url,
          data: JSON.stringify(data)
        });
      };

      self.updateChartById = function(id, data) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart
        // PUT /api/v1/charts
        var url = 'charts/' + id;

        return self.fetchServer({
          method: 'PUT',
          url: url,
          data: JSON.stringify(data)
        });
      };

      self.deleteChartById = function(id) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#delete-one-chart
        // DELETE /api/v1/charts
        var url = 'charts/' + id;

        return self.fetchServer({
          method: 'DELETE',
          url: url
        });
      };

      self.getChartSets = function() {
        // GET /api/v1/chart-sets
        var url = 'chart-sets';

        return self.fetchServer({
          method: 'GET',
          url: url
        });
      };

      self.getChartSetById = function(id) {
        // GET /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return self.fetchServer({
          method: 'GET',
          url: url
        });
      };

      self.createChartSet = function(data) {
        // POST /api/v1/chart-sets
        var url = 'chart-sets';

        return self.fetchServer({
          method: 'POST',
          url: url,
          data: JSON.stringify(data)
        });
      };

      self.deleteChartSetById = function(id) {
        // DELETE /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return self.fetchServer({
          method: 'DELETE',
          url: url
        });
      };

      self.updateChartSetById = function(id, data) {
        // DELETE /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return self.fetchServer({
          method: 'PUT',
          url: url,
          data: JSON.stringify(data)
        });
      };

      self.uploadFile = function(file, type, id) {
        var url = '';

        return self.getRootEndpoint().then(function(rootEndpoint) {
          if (type === 'chart') {
            url = rootEndpoint + 'api/v1/upload/excels';
          } else {
            url = rootEndpoint + 'api/v1/upload/images';
          }

          file.upload = Upload.upload({
            url: url,
            data: { id: id, file: file }
          });

          file.upload.then(undefined, function(response) {
            if (response.status > 0)
              alert(response.status + ': ' + response.data);

          }, function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        });
      };

      /**
       * @method
       * @name makeFriendlyUrl
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
