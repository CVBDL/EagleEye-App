'use strict';

describe('Controller: ChartController', function () {
  var $controller,
    $q,
    $rootScope,
    $stateParams,
    $httpBackend,
    $location,
    $interval,
    EagleEyeWebService,
    ShareService,
    SaveAsPDFService;

  var ChartController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('ShareService', function() {
      return {
        showShareDialog: jasmine.createSpy('showShareDialog')
      };
    });

    $provide.factory('SaveAsPDFService', function() {
      return {
        SaveImageOrPDF: jasmine.createSpy('SaveImageOrPDF')
      };
    });

    $provide.factory('$stateParams', function() {
      return { id: 'id' };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$stateParams_, _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_, _ShareService_, _SaveAsPDFService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    ShareService = _ShareService_;
    SaveAsPDFService = _SaveAsPDFService_;
  }));

  beforeEach(function () {
    ChartController = $controller('ChartController', {
      $stateParams: $stateParams,
      $location: $location,
      $interval: $interval,
      EagleEyeWebService: EagleEyeWebService,
      ShareService: ShareService,
      SaveAsPDFService: SaveAsPDFService
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartController).toBeDefined();
  });

  it('should set DELAY constant value', function() {
    expect(ChartController.DELAY).toBe(60 * 1000);
  });

  it('should initialize data models', function() {
    expect(ChartController.id).toBe('id');
    expect(ChartController.autoReloadChartPromise).toBe(null);
    expect(ChartController.isAutoReloadSwitchOn).toBe(false);
    expect(ChartController.chart).toBeDefined();
  });

  it('should call init() to initialize controller', function() {
    expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
  });

  describe('init()', function() {
    it('should call loadChart() to get chart info', function() {
      spyOn(ChartController, 'loadChart');
      ChartController.id = 'id';
      ChartController.init();
      expect(ChartController.loadChart).toHaveBeenCalledWith('id');
    });
  });

  describe('loadChart()', function() {
    it('should call EagleEyeWebService to fetch chart data', function() {
      ChartController.loadChart('id');
      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
    });

    it('should set controller chart model after fetching chart', function() {
      ChartController.loadChart('id');
      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
      EagleEyeWebService.resolveGetChartById({ id: 'id' });
      $rootScope.$digest();
      expect(ChartController.chart).toEqual({ id: 'id' });
    });
  });

  describe('onAutoReloadSwitchChange()', function() {
    beforeEach(function() {
      spyOn(ChartController, 'startAutoReloadChart');
      spyOn(ChartController, 'stopAutoReloadChart');
    });

    it('should return if none parameter passed in', function() {
      expect(ChartController.onAutoReloadSwitchChange()).not.toBeDefined();
      expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
    });

    it('should start auto reload if passing isAutoReloadSwitchOn = true', function() {
      ChartController.onAutoReloadSwitchChange(true);
      expect(ChartController.startAutoReloadChart).toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
    });

    it('should stop auto reload if passing isAutoReloadSwitchOn = false', function() {
      ChartController.onAutoReloadSwitchChange(false);
      expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).toHaveBeenCalled();
    });
  });

  it('should register an interval task with startAutoReloadChart()', function() {
    spyOn(ChartController, 'loadChart');
    ChartController.id = 'id';
    ChartController.DELAY = 1000;
    ChartController.startAutoReloadChart();
    expect(ChartController.autoReloadChartPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartController.loadChart).toHaveBeenCalledWith('id');
  });

  it('should stop an interval task with stopAutoReloadChart()', function() {
    spyOn(ChartController, 'loadChart');
    spyOn($interval, 'cancel').and.callThrough();
    ChartController.DELAY = 1000;
    ChartController.startAutoReloadChart();
    expect(ChartController.autoReloadChartPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartController.stopAutoReloadChart()).toBe(true);
    expect($interval.cancel).toHaveBeenCalledWith(ChartController.autoReloadChartPromise);
  });

  it('should show share dialog when calls showShare()', function() {
    spyOn($location, 'absUrl').and.returnValue('eagleeye');
    ChartController.showShare('title');
    expect(ShareService.showShareDialog).toHaveBeenCalledWith({
      sharedTitle: 'title',
      sharedLink: 'eagleeye'
    });
  });

  it('should be able to save chart as PDF', function() {
    ChartController.SaveImageOrPDF(0, {});
    expect(SaveAsPDFService.SaveImageOrPDF).toHaveBeenCalledWith(0, {});
  });
});
