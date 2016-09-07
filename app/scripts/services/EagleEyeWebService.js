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
    'Upload',
    function EagleEyeWebService($http, Upload) {
      var webServiceBaseUrl = '',
        fileUploadServiceBaseUrl = '',
        staticServerSideImageBaseUrl = '',
        excelTemplateDownloadBaseUrl = '';

      function setRootEndpoint(url) {
        webServiceBaseUrl            = url + 'api/v1/';
        fileUploadServiceBaseUrl     = url + 'chartFile/',
        staticServerSideImageBaseUrl = url + 'uploadChartImages/',
        excelTemplateDownloadBaseUrl = url + 'chartFile/downloadExcel/';
      }

      function getFileUploadServiceBaseUrl() {
        return fileUploadServiceBaseUrl;
      }

      function getStaticServerSideImageBaseUrl() {
        return staticServerSideImageBaseUrl;
      }

      function getExcelTemplateDownloadBaseUrl() {
        return excelTemplateDownloadBaseUrl;
      }

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

      function updateChartSetById(id, data) {
        // DELETE /api/v1/chart-sets/:_id
        var url = webServiceBaseUrl + 'chart-sets/' + id;

        return fetchServer({
          method: 'PUT',
          url: url,
          data: data
        });
      }

      function uploadFile(file, type, id) {
        var url = '';

        if (type === 'chart') {
          url = fileUploadServiceBaseUrl + 'upload';
        } else {
          url = fileUploadServiceBaseUrl + 'uploadImage';
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
      }

      return {
        setRootEndpoint: setRootEndpoint,
        getFileUploadServiceBaseUrl: getFileUploadServiceBaseUrl,
        getStaticServerSideImageBaseUrl: getStaticServerSideImageBaseUrl,
        getExcelTemplateDownloadBaseUrl: getExcelTemplateDownloadBaseUrl,
        getCharts: getCharts,
        getChartById: getChartById,
        createChart: createChart,
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
