angular.module('GoogleChartsServiceMock', [])
  .factory('GoogleChartsService', function() {
    var makeChartType = jasmine.createSpy('makeChartType').and.callFake(function() {
      return 'LineChart';
    });
    var makeDomainDataType = jasmine.createSpy('makeDomainDataType').and.callFake(function() {
      return 'string';
    });
    var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function() {
      return {
        "cols": [{}],
        "rows": [{}]
      };
    });
    var makeConfigurationOptions = jasmine.createSpy('makeConfigurationOptions').and.callFake(function() {
      return {};
    });

    return {
      makeChartType: makeChartType,
      makeDomainDataType: makeDomainDataType,
      getChartDataTableSamples: getChartDataTableSamples,
      makeConfigurationOptions: makeConfigurationOptions,
    };
  });
