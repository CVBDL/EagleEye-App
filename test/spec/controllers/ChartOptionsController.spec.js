'use strict';

describe('Controller: ChartOptionsController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $stateParams,
    GoogleChartsService,
    EagleEyeWebService,
    EagleEyeWebServiceUtil,
    EEDialogService,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartOptionsController,
    getChartByIdRequestHandler,
    updateChartByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load EEDialogService mock module
  beforeEach(module('EEDialogServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: '1' };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$stateParams_, _EagleEyeWebService_, _EagleEyeWebServiceUtil_, _GoogleChartsService_, _EEDialogService_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    EagleEyeWebService = _EagleEyeWebService_;
    EagleEyeWebServiceUtil = _EagleEyeWebServiceUtil_;
    GoogleChartsService = _GoogleChartsService_;
    EEDialogService = _EEDialogService_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(function() {
    getChartByIdRequestHandler = $httpBackend.when('GET', '/api/v1/charts/1').respond({});
    updateChartByIdRequestHandler = $httpBackend.when('PUT', '/api/v1/charts/1').respond({});
  });

  beforeEach(inject(function($controller, $rootScope) {
    ChartOptionsController = $controller('ChartOptionsController', {
      $state: $state,
      $stateParams: $stateParams,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      EagleEyeWebServiceUtil: EagleEyeWebServiceUtil,
      EEDialogService: EEDialogService,
      IS_STACKED_OPTIONS: IS_STACKED_OPTIONS,
      AXIS_FORMAT_OPTIONS: AXIS_FORMAT_OPTIONS
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartOptionsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartOptionsController.id).toBe('1');
    });

    it('should initialize `isStackedOptions` model', function() {
      expect(ChartOptionsController.isStackedOptions).toBe(IS_STACKED_OPTIONS);
    });

    it('should initialize `axisFormatOptions` model', function() {
      expect(ChartOptionsController.axisFormatOptions).toBe(AXIS_FORMAT_OPTIONS);
    });

    it('should initialize `chart` model', function() {
      expect(ChartOptionsController.chart).not.toBeNull();
      expect(typeof ChartOptionsController.chart).toBe('object');
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch chart using initial `ChartOptionsController.id`', function() {
      $httpBackend.expect('GET', '/api/v1/charts/1');
      $httpBackend.flush();
    });

    it('should set `chart` model with friendlyUrl prefix removed when request success', function() {
      getChartByIdRequestHandler.respond({ _id: '1', friendlyUrl: 'c-chart' });
      $httpBackend.flush();

      expect(ChartOptionsController.chart).toEqual({ _id: '1' , friendlyUrl: 'chart' });
    });

    it('should do nothing when request error', function() {
      ChartOptionsController.chart = {};

      getChartByIdRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartOptionsController.chart).toEqual({});
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('init()', function() {

      it('should make a GET request to fetch chart using `ChartOptionsController.id`', function() {
        ChartOptionsController.id = '1';

        ChartOptionsController.init();

        $httpBackend.expect('GET', '/api/v1/charts/1');
        $httpBackend.flush();
      });

      it('should set `chart` model with friendlyUrl prefix removed when request success', function() {
        ChartOptionsController.id = '1';
        ChartOptionsController.chart = {};

        ChartOptionsController.init();
        getChartByIdRequestHandler.respond({ _id: '1' , friendlyUrl: 'c-chart' });
        $httpBackend.flush();

        expect(ChartOptionsController.chart).toEqual({ _id: '1' , friendlyUrl: 'chart' });
      });

      it('should do nothing when request error', function() {
        ChartOptionsController.id = '1';
        ChartOptionsController.chart = {};

        ChartOptionsController.init();
        getChartByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartOptionsController.chart).toEqual({});
      });
    });

    describe('makeDisplayFriendlyUrl()', function() {

      it('should return empty string if input friendlyUrl is not a string', function() {
        expect(ChartOptionsController.makeDisplayFriendlyUrl()).toBe('');
        expect(ChartOptionsController.makeDisplayFriendlyUrl({})).toBe('');
      });

      it('should return empty string if input friendlyUrl is an empty string', function() {
        expect(ChartOptionsController.makeDisplayFriendlyUrl('')).toBe('');
      });

      it('should remove prefix for displaying friendly url', function() {
        expect(ChartOptionsController.makeDisplayFriendlyUrl('c-url')).toBe('url');
      });
    });

    it('should be able to show help dialog', function() {
      ChartOptionsController.showHelp();
      expect(EEDialogService.showChartCreationHelping).toHaveBeenCalled();
    });

    describe('makeChartPayload()', function() {
      var chart,
        payload;

      it('should return a payload object', function() {
        var chart = { chartType: 'LineChart', options: {} },
          payload;

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(typeof payload).toBe('object');
        expect(payload).not.toBe(null);
      });

      it('should provide `description` in returned payload', function() {
        var chart = { description: 'foo', chartType: 'LineChart', options: {} },
          payload;

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(payload.description).toBe('foo');
      });

      it('should provide a default empty `description`', function() {
        var chart = { chartType: 'LineChart', options: {} },
          payload;

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(payload.description).toBe('');
      });

      it('should provide a prefixed `friendlyUrl`', function() {
        var chart = { friendlyUrl: 'chart', chartType: 'LineChart', options: {} },
          payload;

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(payload.friendlyUrl).toBe('c-chart');
      });

      it('should provide a default empty `friendlyUrl`', function() {
        var chart = { chartType: 'LineChart', options: {} },
          payload;

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(payload.friendlyUrl).toBe('');
      });

      it('should provide `options` object', function() {
        var chart = { chartType: 'LineChart', options: {} },
          payload;

        spyOn(GoogleChartsService, 'makeConfigurationOptions').and.callThrough();

        payload = ChartOptionsController.makeChartPayload(chart);

        expect(GoogleChartsService.makeConfigurationOptions).toHaveBeenCalledWith('LineChart', {});
        expect(typeof payload.options).toBe('object');
        expect(payload.options).not.toBe(null);
      });
    });

    describe('save()', function() {

      beforeEach(function() {
        spyOn(ChartOptionsController, 'makeChartPayload').and.returnValue({ foo: 'foo' });
        spyOn($state, 'go');
      });

      it('should call `makeChartPayload()` to prepare payload', function() {
        var chart = { _id: 1 };

        ChartOptionsController.save(chart);
        expect(ChartOptionsController.makeChartPayload).toHaveBeenCalledWith(chart);
        $httpBackend.flush();
      });

      it('should make a PUT request with chart id and generated payload', function() {
        var chart = { _id: '1' };

        ChartOptionsController.save(chart);

        $httpBackend.expect('PUT', '/api/v1/charts/1', { foo: 'foo' });
        $httpBackend.flush();
      });

      it('should navigate to chart page when request success', function() {
        var chart = { _id: '1' };

        ChartOptionsController.save(chart);
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('chart', { id: '1' });
      });
    });
  });
});
