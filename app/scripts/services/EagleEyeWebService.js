'use strict';

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeWebService
 * @description
 * # EagleEyeWebService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .provider('EagleEyeWebService', function EagleEyeWebServiceProvider() {
    var webServiceBaseUrl = '';

    this.setWebServiceBaseUrl = function(url) {
      webServiceBaseUrl = url;
    };

    this.$get = [
      '$http',
      function EagleEyeWebService($http) {

        function fetchServer(options) {
          return $http(options).then(function(response) {
            return response.data;
          });
        }

        function getCharts() {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-all-charts
          // GET /api/v1/charts
          var url = webServiceBaseUrl + 'charts';

          return fetchServer({
            method: 'GET',
            url: url
          });
        }

        function getChartById(id) {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-one-chart
          // GET /api/v1/charts/:_id
          var url = webServiceBaseUrl + 'charts/' + id;

          return fetchServer({
            method: 'GET',
            url: url
          });
        }

        function createChart(data) {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#create-a-new-chart
          // POST /api/v1/charts
          var url = webServiceBaseUrl + 'charts';

          return fetchServer({
            method: 'POST',
            url: url,
            data: data
          });
        }
        function deleteChartById(id) {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#delete-one-chart
          // DELETE /api/v1/charts
          var url = webServiceBaseUrl + 'charts/' + id;

          return fetchServer({
            method: 'DELETE',
            url: url
          });
        }

        function getChartSets() {
          // GET /api/v1/chart-sets
          var url = webServiceBaseUrl + 'chart-sets';

          return fetchServer({
            method: 'GET',
            url: url
          });
        }

        function getChartSetById(id) {
          // GET /api/v1/chart-sets/:_id
          var url = webServiceBaseUrl + 'chart-sets/' + id;

          return fetchServer({
            method: 'GET',
            url: url
          });
        }

        function createChartSet(data) {
          // POST /api/v1/chart-sets
          var url = webServiceBaseUrl + 'chart-sets';

          return fetchServer({
            method: 'POST',
            url: url,
            data: data
          });
        }

        function deleteChartSetById(id) {
          // DELETE /api/v1/chart-sets/:_id
          var url = webServiceBaseUrl + 'chart-sets/' + id;

          return fetchServer({
            method: 'DELETE',
            url: url
          });
        }

        function updateChartSetById(id,data) {
          // DELETE /api/v1/chart-sets/:_id
          var url = webServiceBaseUrl + 'chart-sets/' + id;

          return fetchServer({
            method: 'PUT',
            url: url,
            data: data
          });
        }

        return {
          getCharts: getCharts,
          getChartById: getChartById,
          createChart: createChart,
          getChartSets: getChartSets,
          getChartSetById: getChartSetById,
          createChartSet: createChartSet,
          deleteChartById:deleteChartById,
          deleteChartSetById:deleteChartSetById,
          updateChartSetById:updateChartSetById
        };
      }
    ];
  });
