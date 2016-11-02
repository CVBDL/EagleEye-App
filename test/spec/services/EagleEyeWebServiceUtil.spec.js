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

describe('Service: EagleEyeWebServiceUtil', function() {
  var $httpBackend;

  // instantiate service
  var EagleEyeWebServiceUtil;

  // load the service's module
  beforeEach(module('eagleeye'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$httpBackend_, _EagleEyeWebServiceUtil_) {
    $httpBackend = _$httpBackend_;
    EagleEyeWebServiceUtil = _EagleEyeWebServiceUtil_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('makeFriendlyUrl()', function() {
    it('should return empty string if not pass friendlyName parameter or passing empty string', function() {
      expect(EagleEyeWebServiceUtil.makeFriendlyUrl('', '')).toBe('');
      expect(function() {
        EagleEyeWebServiceUtil.makeFriendlyUrl('', '');
      }).not.toThrow();

      expect(EagleEyeWebServiceUtil.makeFriendlyUrl('')).toBe('');
      expect(function() {
        EagleEyeWebServiceUtil.makeFriendlyUrl('');
      }).not.toThrow();
    });

    it('should return friendly url with prefix if input type is valid', function() {
      expect(EagleEyeWebServiceUtil.makeFriendlyUrl('chart', 'foo')).toBe('c-foo');
      expect(EagleEyeWebServiceUtil.makeFriendlyUrl('chartset', 'foo')).toBe('s-foo');
    });

    it('should throw an error if input type is invalid', function() {
      expect(function() {
        EagleEyeWebServiceUtil.makeFriendlyUrl('foo', 'bar');
      }).toThrow(new Error('foo is an invalid chart type. Available types are: LineChart, ColumnChart, BarChart, ComboChart, AreaChart and ImageChart.'));
    });
  });
});
