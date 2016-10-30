'use strict';

describe('Controller: ChartOptionsController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $stateParams,
    GoogleChartsService,
    EagleEyeWebService,
    HelpDialogService,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartOptionsController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load GoogleChartsService mock module
  beforeEach(module('GoogleChartsServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('HelpDialogService', function() {
      return {
        showHelp: jasmine.createSpy('showHelp')
      };
    });

    $provide.factory('$stateParams', function() {
      return {
        id: 'id'
      };
    });

    $provide.constant('IS_STACKED_OPTIONS', { bar: 1 });
    $provide.constant('AXIS_FORMAT_OPTIONS', { foobar: 1 });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$stateParams_, _EagleEyeWebService_, _GoogleChartsService_, _HelpDialogService_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    HelpDialogService = _HelpDialogService_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(inject(function($controller, $rootScope) {
    ChartOptionsController = $controller('ChartOptionsController', {
      $state: $state,
      $stateParams: $stateParams,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      HelpDialogService: HelpDialogService,
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
  });

  it('should initialize data models', function() {
    expect(ChartOptionsController.id).toBe('id');
    expect(ChartOptionsController.isStackedOptions).toEqual({ bar: 1 });
    expect(ChartOptionsController.axisFormatOptions).toEqual({ foobar: 1 });
    expect(ChartOptionsController.chart).toBeDefined();
    expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
  });

  describe('init()', function() {
    it('should fetch chart first', function() {
      ChartOptionsController.id = 'id';
      ChartOptionsController.init();
      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
    });

    it('should initialize chart data model after fetching chart', function() {
      spyOn(ChartOptionsController, 'makeDisplayFriendlyUrl').and.returnValue('friendly-url');
      ChartOptionsController.init();
      EagleEyeWebService.resolveGetChartById({ friendlyUrl: 'c-friendly-url' });
      $rootScope.$digest();
      expect(ChartOptionsController.makeDisplayFriendlyUrl).toHaveBeenCalledWith('c-friendly-url');
      expect(ChartOptionsController.chart).toEqual({ friendlyUrl: 'friendly-url' });
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
    expect(HelpDialogService.showHelp).toHaveBeenCalled();
  });

  describe('makeChartPayload()', function() {
    var chart,
      payload;

    beforeEach(function() {
      chart = {
        chartType: 'LineChart',
        description: 'foo',
        friendlyUrl: 'friendly-url',
        options: {}
      };

      payload = ChartOptionsController.makeChartPayload(chart);
    });

    it('makeChartPayload() should return a payload object', function() {
      expect(typeof payload).toBe('object');
      expect(payload).not.toBe(null);
    });

    it('makeChartPayload() should make chart description payload', function() {
      expect(payload.description).toBe('foo');
    });

    it('makeChartPayload() should make friendlyUrl payload', function() {
      expect(EagleEyeWebService.makeFriendlyUrl).toHaveBeenCalledWith('chart', 'friendly-url');
      expect(payload.friendlyUrl).toBe('x-friendly-url');
    });

    it('makeChartPayload() should make options payload', function() {
      expect(GoogleChartsService.makeConfigurationOptions).toHaveBeenCalledWith('LineChart', {});
      expect(payload.options).toEqual({});
    });
  });

  describe('save()', function() {
    beforeEach(function() {
      spyOn(ChartOptionsController, 'makeChartPayload').and.returnValue({});
      spyOn($state, 'go');
    });

    it('should make chart payload first', function() {
      var chart = {};

      ChartOptionsController.save(chart);
      expect(ChartOptionsController.makeChartPayload).toHaveBeenCalledWith(chart);
    });

    it('should go to chart page when create successfully', function() {
      var chart = { _id: 'id' };

      ChartOptionsController.save(chart);
      expect(EagleEyeWebService.updateChartById).toHaveBeenCalledWith('id', {});
      EagleEyeWebService.resolveUpdateChartById({ _id: 'id' });
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalledWith('chart', { id: 'id' });
    });

    it('should not go to chart page when create successfully', function() {
      var chart = { _id: 'id' };

      ChartOptionsController.save(chart);
      expect(EagleEyeWebService.updateChartById).toHaveBeenCalledWith('id', {});
      EagleEyeWebService.rejectUpdateChartById();
      $rootScope.$digest();
      expect($state.go).not.toHaveBeenCalled();
    });
  });
});
