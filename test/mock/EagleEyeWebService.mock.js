angular.module('EagleEyeWebServiceMock', [])
  .factory('EagleEyeWebService', function($http, $q, FRIENDLY_URL_PREFIX_CHART, FRIENDLY_URL_PREFIX_CHARTSET) {
    var qGetChartSetById,
      qGetChartSets,
      qCreateChartSet,
      qDeleteChartSetById,
      qUpdateChartSetById;

    var getChartById = jasmine.createSpy('getChartById').and.callFake(function(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/charts/' + id
      }).then(function(response) {
        return response.data;
      });
    });
    var createChart = jasmine.createSpy('createChart').and.callFake(function(payload) {
      return $http({
        method: 'POST',
        url: '/api/v1/charts',
        data: JSON.stringify(payload)
      }).then(function(response) {
        return response.data;
      });
    });
    var updateChartById = jasmine.createSpy('updateChartById').and.callFake(function(id, payload) {
      return $http({
        method: 'PUT',
        url: '/api/v1/charts/' + id,
        data: JSON.stringify(payload)
      }).then(function(response) {
        return response.data;
      });
    });
    var getCharts = jasmine.createSpy('getCharts').and.callFake(function() {
      return $http({
        method: 'GET',
        url: '/api/v1/charts'
      }).then(function(response) {
        return response.data;
      });
    });
    var deleteChartById = jasmine.createSpy('deleteChartById').and.callFake(function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/v1/charts/' + id
      }).then(function(response) {
        return response.data;
      });
    });
    var getChartSetById = jasmine.createSpy('getChartSetById').and.callFake(function(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/chart-sets/' + id
      }).then(function(response) {
        return response.data;
      });
    });
    var getChartSets = jasmine.createSpy('getChartSets').and.callFake(function() {
      return $http({
        method: 'GET',
        url: '/api/v1/chart-sets'
      }).then(function(response) {
        return response.data;
      });
    });
    var createChartSet = jasmine.createSpy('createChartSet').and.callFake(function(payload) {
      return $http({
        method: 'POST',
        url: '/api/v1/chart-sets',
        data: JSON.stringify(payload)
      }).then(function(response) {
        return response.data;
      });
    });
    var deleteChartSetById = jasmine.createSpy('deleteChartSetById').and.callFake(function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/v1/chart-sets/' + id
      }).then(function(response) {
        return response.data;
      });
    });
    var updateChartSetById = jasmine.createSpy('updateChartSetById').and.callFake(function(id, payload) {
      return $http({
        method: 'PUT',
        url: '/api/v1/chart-sets/' + id,
        data: JSON.stringify(payload)
      }).then(function(response) {
        return response.data;
      });
    });
    var uploadFile = jasmine.createSpy('uploadFile');

    return {
      getChartById: getChartById,
      createChart: createChart,
      updateChartById: updateChartById,
      getCharts: getCharts,
      deleteChartById: deleteChartById,
      getChartSetById: getChartSetById,
      getChartSets: getChartSets,
      createChartSet: createChartSet,
      deleteChartSetById: deleteChartSetById,
      updateChartSetById: updateChartSetById,
      uploadFile: uploadFile
    };
  });
