angular.module('EagleEyeWebServiceMock', [])
  .factory('EagleEyeWebService', function($q) {
    var qGetChartById,
      qCreateChart,
      qUpdateChartById,
      qGetCharts,
      deleteChartById,
      qGetChartSetById,
      qGetChartSets,
      qCreateChartSet,
      qDeleteChartSetById,
      qUpdateChartSetById;

    var getChartById = jasmine.createSpy('getChartById').and.callFake(function(chartId) {
      qGetChartById = $q.defer();

      return qGetChartById.promise;
    });
    var createChart = jasmine.createSpy('createChart').and.callFake(function(payload) {
      qCreateChart = $q.defer();

      return qCreateChart.promise;
    });
    var updateChartById = jasmine.createSpy('updateChartById').and.callFake(function(chartId) {
      qUpdateChartById = $q.defer();

      return qUpdateChartById.promise;
    });
    var getCharts = jasmine.createSpy('getCharts').and.callFake(function() {
      qGetCharts = $q.defer();

      return qGetCharts.promise;
    });
    var deleteChartById = jasmine.createSpy('deleteChartById').and.callFake(function(chartId) {
      qDeleteChartById = $q.defer();

      return qDeleteChartById.promise;
    });
    var getChartSetById = jasmine.createSpy('getChartSetById').and.callFake(function(chartId) {
      qGetChartSetById = $q.defer();

      return qGetChartSetById.promise;
    });
    var getChartSets = jasmine.createSpy('getChartSets').and.callFake(function(chartId) {
      qGetChartSets = $q.defer();

      return qGetChartSets.promise;
    });
    var createChartSet = jasmine.createSpy('createChartSet').and.callFake(function(payload) {
      qCreateChartSet = $q.defer();

      return qCreateChartSet.promise;
    });
    var deleteChartSetById = jasmine.createSpy('deleteChartSetById').and.callFake(function(chartId) {
      qDeleteChartSetById = $q.defer();

      return qDeleteChartSetById.promise;
    });
    var updateChartSetById = jasmine.createSpy('updateChartSetById').and.callFake(function(id) {
      qUpdateChartSetById = $q.defer();

      return qUpdateChartSetById.promise;
    });
    var makeFriendlyUrl = jasmine.createSpy('makeFriendlyUrl').and.callFake(function(type, url) {
      return 'x-friendly-url';
    });
    var uploadFile = jasmine.createSpy('uploadFile');

    return {
      getChartById: getChartById,
      resolveGetChartById: function(value) { qGetChartById.resolve(value); },
      rejectGetChartById: function(reason) { qGetChartById.reject(reason); },
      createChart: createChart,
      resolveCreateChart: function(value) { qCreateChart.resolve(value); },
      rejectCreateChart: function(reason) { qCreateChart.reject(reason); },
      updateChartById: updateChartById,
      resolveUpdateChartById: function(value) { qUpdateChartById.resolve(value); },
      rejectUpdateChartById: function(reason) { qUpdateChartById.reject(reason); },
      getCharts: getCharts,
      resolveGetCharts: function(value) { qGetCharts.resolve(value); },
      rejectGetCharts: function(reason) { qGetCharts.reject(reason); },
      deleteChartById: deleteChartById,
      resolveDeleteChartById: function(value) { qDeleteChartById.resolve(value); },
      rejectDeleteChartById: function(reason) { qDeleteChartById.reject(reason); },
      getChartSetById: getChartSetById,
      resolveGetChartSetById: function(value) { qGetChartSetById.resolve(value); },
      rejectGetChartSetById: function(reason) { qGetChartSetById.reject(reason); },
      getChartSets: getChartSets,
      resolveGetChartSets: function(value) { qGetChartSets.resolve(value); },
      rejectGetChartSets: function(reason) { qGetChartSets.reject(reason); },
      createChartSet: createChartSet,
      resolveCreateCharSett: function(value) { qCreateChartSet.resolve(value); },
      rejectCreateChartSet: function(reason) { qCreateChartSet.reject(reason); },
      deleteChartSetById: deleteChartSetById,
      resolveDeleteChartSetById: function(value) { qDeleteChartSetById.resolve(value); },
      rejectDeleteChartSetById: function(reason) { qDeleteChartSetById.reject(reason); },
      updateChartSetById: updateChartSetById,
      resolveUpdateChartSetById: function(value) { qUpdateChartSetById.resolve(value); },
      rejectUpdateChartSetById: function(reason) { qUpdateChartSetById.reject(reason); },
      makeFriendlyUrl: makeFriendlyUrl,
      uploadFile: uploadFile
    };
  });