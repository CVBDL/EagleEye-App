'use strict';

describe('Controller: ChartOptionsController', function() {
  var $controller,
    $httpBackend,
    $mdDialog,
    $state,
    $stateParams,
    GoogleChartsService,
    EagleEyeWebService,
    EEDialogService,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartOptionsController,
    getChartByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load ngMaterial mock module
  beforeEach(module('ngMaterialMock'));

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
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(
      _$controller_, _$httpBackend_, _$mdDialog_, _$state_, _$stateParams_,
      _EagleEyeWebService_, _GoogleChartsService_, _EEDialogService_,
      _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {

    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    EEDialogService = _EEDialogService_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(function() {
    getChartByIdRequestHandler = $httpBackend.when('GET', '/api/v1/charts/1').respond({});
    $httpBackend.when('PUT', '/api/v1/charts/1').respond({});
  });

  beforeEach(inject(function() {
    ChartOptionsController = $controller('ChartOptionsController', {
      $state: $state,
      $stateParams: $stateParams,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
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

      it('should do nothing when request error', function() {
        ChartOptionsController.id = '1';
        ChartOptionsController.chart = {};

        ChartOptionsController.init();
        getChartByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartOptionsController.chart).toEqual({});
      });
    });

    it('should be able to show help dialog', function() {
      ChartOptionsController.showHelp();

      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: undefined,
        controller: jasmine.anything(),
        templateUrl: 'scripts/templates/chart-creation-help.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    describe('makeChartPayload()', function() {

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
