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
    }

    this.$get = [
      '$http',
      function EagleEyeWebService($http) {

        function fetchServer(options) {
          return $http(options).then(function(response) {
            return response.data;
          });
        }

        function fetchCharts() {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#list-all-charts
          // GET /api/v1/charts
          var url = webServiceBaseUrl + 'charts';

          return fetchServer({
            method: 'GET',
            url: url
          });
        };

        function fetchChartById(id) {
          // https://github.com/CVBDL/EagleEye-Docs/blob/master/rest-api/rest-api.md#get-one-chart
          // GET /api/v1/charts/:id
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

        return {
          fetchCharts: fetchCharts,
          fetchChartById: fetchChartById,
          createChart: createChart
        };
      }
    ];
  });
