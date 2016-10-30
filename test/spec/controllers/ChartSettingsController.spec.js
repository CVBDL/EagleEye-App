'use strict';

describe('Controller: ChartSettingsController', function() {
  var $controller,
    $q,
    $rootScope,
    $stateParams,
    $httpBackend,
    EagleEyeWebService;

  var ChartSettingsController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: 'id' };
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
  });

  it('should initialize data models', function() {
    expect(ChartSettingsController.id).toBe('id');
    expect(ChartSettingsController.chart).toBeDefined();
  });

  it('should call init() to initialize controller', function() {
    expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
  });

  describe('init()', function() {
    it('should call loadChart() to get chart info', function() {
      spyOn(ChartSettingsController, 'loadChart');
      ChartSettingsController.id = 'id';
      ChartSettingsController.init();
      expect(ChartSettingsController.loadChart).toHaveBeenCalledWith('id');
    });
  });

  describe('loadChart()', function() {
    it('should call EagleEyeWebService to fetch chart data', function() {
      ChartSettingsController.loadChart('id');
      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
    });

    it('should set controller chart model after fetching chart', function() {
      ChartSettingsController.loadChart('id');
      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
      EagleEyeWebService.resolveGetChartById({ id: 'id' });
      $rootScope.$digest();
      expect(ChartSettingsController.chart).toEqual({ id: 'id' });
    });
  });

  describe('upload()', function() {
    it('should call EagleEyeWebService to upload file', function() {
      ChartSettingsController.chart = { type: 'chart' };
      ChartSettingsController.id = 'id';
      ChartSettingsController.upload({});
      expect(EagleEyeWebService.uploadFile).toHaveBeenCalledWith({}, 'chart', 'id');
    });
  });
});
