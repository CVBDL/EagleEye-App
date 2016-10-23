'use strict';

describe('Service: GoogleChartsService', function () {

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var GoogleChartsService;
  beforeEach(inject(function (_GoogleChartsService_) {
    GoogleChartsService = _GoogleChartsService_;
  }));

  it('should be able to create this service', function () {
    expect(!!GoogleChartsService).toBe(true);
  });

  describe('validateChartType()', function() {
    var chartTypeOptions = [{
      label: 'Line Chart',
      value: 'LineChart'
    }, {
      label: 'Column Chart',
      value: 'ColumnChart'
    }, {
      label: 'Image Chart',
      value: 'ImageChart'
    }];

    it('should return true when input a valid chart type', function () {
      expect(GoogleChartsService.validateChartType('LineChart')).toBe(true);
      expect(GoogleChartsService.validateChartType('ColumnChart')).toBe(true);
      expect(GoogleChartsService.validateChartType('ImageChart')).toBe(true);
    });

    it('should return false when input an invalid chart type', function () {
      expect(GoogleChartsService.validateChartType('')).toBe(false);
      expect(GoogleChartsService.validateChartType('linechart')).toBe(false);
      expect(GoogleChartsService.validateChartType('columnchart')).toBe(false);
      expect(GoogleChartsService.validateChartType('imagechart')).toBe(false);
      expect(GoogleChartsService.validateChartType('piechart')).toBe(false);
    });
  });

});
