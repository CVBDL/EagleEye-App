'use strict';

angular.module('eagleeye')

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeWebService
 * @requires $http
 * @requires $q
 * @requires ngFileUpload.Upload
 * @description Communicating with EagleEye-Platform rest APIs.
 */
.factory('EagleEyeWebService', [
  '$http',
  '$q',
  'Upload',
  function EagleEyeWebService($http, $q, Upload) {
    var self = {};

    /**
     * @property
     * @private
     * @name eagleeye.EagleEyeWebService#_rootEndpoint
     * @description
     * EagleEye platform rest api root endpoint.
     * @type {string}
     */
    self._rootEndpoint = '';

    /**
     * @method
     * @private
     * @name eagleeye.EagleEyeWebService#getRootEndpoint
     * @description
     * Read `config.json` file to config service root endpoint.
     * @returns {promise} A promise that will be resolved with
     *                    service `_rootEndpoint`.
     */
    self.getRootEndpoint = function() {
      if (self._rootEndpoint) {
        return $q.when(self._rootEndpoint);

      } else {
        return $http.get('../config.json').then(function(response) {
          self._rootEndpoint = response.data.root_endpoint;

          return self._rootEndpoint;
        });
      }
    };

    /**
     * @method
     * @private
     * @name eagleeye.EagleEyeWebService#fetchServer
     * @description
     * Collect xhr options and send ajax request to server.
     * @param {Object} options Ajax request options.
     * @returns {promise} A promise that returned by $http service.
     */
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
      // POST /api/v1/charts/:_id
      var url = 'charts/' + id;

      return self.fetchServer({
        method: 'POST',
        url: url,
        data: JSON.stringify(data)
      });
    };

    self.deleteChartById = function(id) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#delete-one-chart
      // DELETE /api/v1/charts/:_id
      var url = 'charts/' + id;

      return self.fetchServer({
        method: 'DELETE',
        url: url
      });
    };

    self.getChartSets = function() {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-all-chart-sets
      // GET /api/v1/chart-sets
      var url = 'chart-sets';

      return self.fetchServer({
        method: 'GET',
        url: url
      });
    };

    self.getChartSetById = function(id) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-a-single-chart-set-via-chart-set-id
      // GET /api/v1/chart-sets/:_id
      var url = 'chart-sets/' + id;

      return self.fetchServer({
        method: 'GET',
        url: url
      });
    };

    self.createChartSet = function(data) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-chart-set
      // POST /api/v1/chart-sets
      var url = 'chart-sets';

      return self.fetchServer({
        method: 'POST',
        url: url,
        data: JSON.stringify(data)
      });
    };

    self.deleteChartSetById = function(id) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#delete-a-chart-set
      // DELETE /api/v1/chart-sets/:_id
      var url = 'chart-sets/' + id;

      return self.fetchServer({
        method: 'DELETE',
        url: url
      });
    };

    self.updateChartSetById = function(id, data) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart-set
      // POST /api/v1/chart-sets/:_id
      var url = 'chart-sets/' + id;

      return self.fetchServer({
        method: 'POST',
        url: url,
        data: JSON.stringify(data)
      });
    };

    self.uploadFile = function(file, id) {
      return self.getRootEndpoint().then(function(rootEndpoint) {
        var url = rootEndpoint + 'api/v1/charts/' + id + '/files';

        file.upload = Upload.upload({
          url: url,
          data: { file: file }
        });

        file.upload.then(undefined, function(response) {
          if (response.status > 0)
            console.log(response.status + ': ' + response.data);

        }, function(evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 100));
        });
      });
    };

    self.getJobs = function() {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-jobs
      // GET /api/v1/jobs
      var url = 'jobs';

      return self.fetchServer({
        method: 'GET',
        url: url
      });
    };

    self.getJob = function(jobId) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-a-single-job
      // GET /api/v1/jobs/:id
      var url = 'jobs/' + jobId;

      return self.fetchServer({
        method: 'GET',
        url: url
      });
    };

    self.createJob = function(data) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-job
      // POST /api/v1/jobs
      var url = 'jobs';

      return self.fetchServer({
        method: 'POST',
        url: url,
        data: JSON.stringify(data)
      });
    };

    self.deleteJob = function(jobId) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-job
      // POST /api/v1/jobs
      var url = 'jobs/' + jobId;

      return self.fetchServer({
        method: 'DELETE',
        url: url
      });
    };

    self.restartJob = function(jobId) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#restart-a-job
      // PUT /api/v1/jobs/:_id/restart
      var url = 'jobs/' + jobId + '/restart';

      return self.fetchServer({
        method: 'PUT',
        url: url
      });
    };

    self.getTasks = function(jobId) {
      // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-tasks
      // GET /api/v1/tasks?jobId=1
      var url = 'jobs/' + jobId + '/tasks';

      return self.fetchServer({
        method: 'GET',
        url: url
      });
    };

    return self;
  }
]);
