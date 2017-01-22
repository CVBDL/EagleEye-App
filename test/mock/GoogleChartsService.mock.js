angular.module('GoogleChartsServiceMock', [])
  .factory('GoogleChartsService', function() {
    var makeChartType = jasmine.createSpy('makeChartType').and.callFake(function() {
      return 'LineChart';
    });
    var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function() {
      return {
        'cols': [{}],
        'rows': [{}]
      };
    });
    var makeConfigurationOptions = jasmine.createSpy('makeConfigurationOptions').and.callFake(function() {
      return {};
    });

    return {
      makeChartType: makeChartType,
      getChartDataTableSamples: getChartDataTableSamples,
      makeConfigurationOptions: makeConfigurationOptions
    };
  });
