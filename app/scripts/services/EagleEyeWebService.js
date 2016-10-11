'use strict';

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeWebService
 * @description
 * # EagleEyeWebService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('EagleEyeWebService', [
    '$http',
    '$q',
    'Upload',
    function EagleEyeWebService($http, $q, Upload) {
      var isRootEndpointInitialized = false,
        rootEndpoint = '';

      function getRootEndpoint() {
        if (isRootEndpointInitialized) {
          return $q.when(rootEndpoint);

        } else {
          return $http.get('../config.json').then(function(response) {
            isRootEndpointInitialized = true;
            rootEndpoint = response.data.root_endpoint;

            return rootEndpoint;
          });
        }
      }

      function fetchServer(options) {
        return getRootEndpoint().then(function(rootEndpoint) {
          options.url = rootEndpoint + 'api/v1/' + options.url;

            return $http(options).then(function(response) {
              return response.data;
            });
        });
      }

      function getCharts() {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-all-charts
        // GET /api/v1/charts
        var url = 'charts';

        return fetchServer({
          method: 'GET',
          url: url
        });
      }

      function getChartById(id) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-one-chart
        // GET /api/v1/charts/:_id
        var url = 'charts/' + id;

        return fetchServer({
          method: 'GET',
          url: url
        });
      }

      function createChart(data) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-new-chart
        // POST /api/v1/charts
        var url = 'charts';

        return fetchServer({
          method: 'POST',
          url: url,
          data: data
        });
      }

      function updateChartById(id, data) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#edit-a-chart
        // PUT /api/v1/charts
        var url = 'charts/' + id;

        return fetchServer({
          method: 'PUT',
          url: url,
          data: data
        });
      }

      function deleteChartById(id) {
        // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#delete-one-chart
        // DELETE /api/v1/charts
        var url = 'charts/' + id;

        return fetchServer({
          method: 'DELETE',
          url: url
        });
      }

      function getChartSets() {
        // GET /api/v1/chart-sets
        var url = 'chart-sets';

        return fetchServer({
          method: 'GET',
          url: url
        });
      }

      function getChartSetById(id) {
        // GET /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return fetchServer({
          method: 'GET',
          url: url
        });
      }

      function createChartSet(data) {
        // POST /api/v1/chart-sets
        var url = 'chart-sets';

        return fetchServer({
          method: 'POST',
          url: url,
          data: data
        });
      }

      function deleteChartSetById(id) {
        // DELETE /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return fetchServer({
          method: 'DELETE',
          url: url
        });
      }

      function updateChartSetById(id, data) {
        // DELETE /api/v1/chart-sets/:_id
        var url = 'chart-sets/' + id;

        return fetchServer({
          method: 'PUT',
          url: url,
          data: data
        });
      }

      function uploadFile(file, type, id) {
        var url = '';

        return getRootEndpoint().then(function(rootEndpoint) {
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
      }

      return {
        getCharts: getCharts,
        getChartById: getChartById,
        createChart: createChart,
        updateChartById: updateChartById,
        getChartSets: getChartSets,
        getChartSetById: getChartSetById,
        createChartSet: createChartSet,
        deleteChartById: deleteChartById,
        deleteChartSetById: deleteChartSetById,
        updateChartSetById: updateChartSetById,
        uploadFile: uploadFile
      };
    }
  ]);
