'use strict';

describe('Constant:', function() {
  var FRIENDLY_URL_PREFIX_CHART,
    FRIENDLY_URL_PREFIX_CHARTSET;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function (_FRIENDLY_URL_PREFIX_CHART_, _FRIENDLY_URL_PREFIX_CHARTSET_) {
    FRIENDLY_URL_PREFIX_CHART = _FRIENDLY_URL_PREFIX_CHART_;
    FRIENDLY_URL_PREFIX_CHARTSET = _FRIENDLY_URL_PREFIX_CHARTSET_;
  }));

  describe('FRIENDLY_URL_PREFIX_CHART', function() {
    it('should be initialized', function() {
      expect(FRIENDLY_URL_PREFIX_CHART).toBe('c-');
    });
  });

  describe('FRIENDLY_URL_PREFIX_CHARTSET', function() {
    it('should be initialized', function() {
      expect(FRIENDLY_URL_PREFIX_CHARTSET).toBe('s-');
    });
  });
});

describe('Service: EagleEyeWebService', function() {

  var chartId                      = '57837029c66dc1a4570962b6';
  var rootEndpoint                 = 'http://8.8.8.8:6666/';
  var webServiceBaseUrl            = rootEndpoint + 'api/v1/';
  var staticServerSideImageBaseUrl = rootEndpoint + 'uploadChartImages/';
  var excelTemplateDownloadBaseUrl = webServiceBaseUrl + 'download/excels/';
  var excelTemplateDownloadUrl     = webServiceBaseUrl + 'download/excels/' + chartId;

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var EagleEyeWebService,
    $httpBackend;

  beforeEach(inject(function (_EagleEyeWebService_) {
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('should export correct interfaces', function() {
    var exports = [
      'getCharts',
      'getChartById',
      'createChart',
      'getChartSets',
      'getChartSetById',
      'createChartSet',
      'deleteChartById',
      'deleteChartSetById',
      'updateChartSetById',
      'uploadFile'
    ];

    exports.forEach(function(fnName) {
      expect(EagleEyeWebService[fnName]).toBeDefined();
    });
  });

  describe('makeFriendlyUrl()', function() {
    it('should return empty string if not pass friendlyName parameter or passing empty string', function() {
      expect(EagleEyeWebService.makeFriendlyUrl('', '')).toBe('');
      expect(function() {
        EagleEyeWebService.makeFriendlyUrl('', '');
      }).not.toThrow();

      expect(EagleEyeWebService.makeFriendlyUrl('')).toBe('');
      expect(function() {
        EagleEyeWebService.makeFriendlyUrl('');
      }).not.toThrow();
    });

    it('should return friendly url with prefix if input type is valid', function() {
      expect(EagleEyeWebService.makeFriendlyUrl('chart', 'foo')).toBe('c-foo');
      expect(EagleEyeWebService.makeFriendlyUrl('chartset', 'foo')).toBe('s-foo');
    });

    it('should throw an error if input type is invalid', function() {
      expect(function() {
        EagleEyeWebService.makeFriendlyUrl('foo', 'bar');
      }).toThrow(new Error('foo is an invalid chart type. Available types are: LineChart, ColumnChart, BarChart, ComboChart, AreaChart and ImageChart.'));
    });
  });
});
