'use strict';

describe('Controller: ChartSettingsController', function() {
  var $controller,
    $q,
    $rootScope,
    $stateParams,
    $httpBackend,
    EagleEyeWebService;

  var ChartSettingsController,
    getChartByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: '1' };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise( function(){ return false; });
  }));

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$stateParams_, _$httpBackend_,_EagleEyeWebService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    getChartByIdRequestHandler = $httpBackend.when('GET', '/api/v1/charts/1').respond([]);
  });

  beforeEach(function() {
    ChartSettingsController = $controller('ChartSettingsController', {
      $stateParams: $stateParams,
      EagleEyeWebService: EagleEyeWebService
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSettingsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartSettingsController.id).toBe('1');
    });

    it('should initialize `chart` model', function() {
      expect(ChartSettingsController.chart).not.toBeNull();
      expect(typeof ChartSettingsController.chart).toBe('object');
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch chart using `$stateParams.id`', function() {
      $httpBackend.expect('GET', '/api/v1/charts/1');
      $httpBackend.flush();
    });

    it('should set `chart` model when request success', function() {
      var chart = { _id: '1' };

      getChartByIdRequestHandler.respond(chart);
      $httpBackend.flush();

      expect(ChartSettingsController.chart).toEqual(chart);
    });

    it('should do nothing when request error', function() {
      ChartSettingsController.chart = {};

      getChartByIdRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartSettingsController.chart).toEqual({});
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('loadChart()', function() {

      it('should make a GET request to fetch chart using the padding `id` parameter', function() {
        ChartSettingsController.loadChart('1');

        $httpBackend.expect('GET', '/api/v1/charts/1');
        $httpBackend.flush();
      });

      it('should set `chart` model when request success', function() {
        ChartSettingsController.loadChart('1');
        getChartByIdRequestHandler.respond({ _id: '1' });
        $httpBackend.flush();

        expect(ChartSettingsController.chart).toEqual({ _id: '1' });
      });

      it('should do nothing when request error', function() {
        ChartSettingsController.chart = {};

        ChartSettingsController.loadChart('1');
        getChartByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSettingsController.chart).toEqual({});
      });
    });

    describe('upload()', function() {
      it('should call EagleEyeWebService to upload file', function() {
        ChartSettingsController.chart = { type: 'chart' };
        ChartSettingsController.id = '1';

        ChartSettingsController.upload({});

        expect(EagleEyeWebService.uploadFile).toHaveBeenCalledWith({}, 'chart', '1');
      });
    });
  });
});
