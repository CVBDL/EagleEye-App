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
    eeShareService,
    eeSaveAsPDFService;

  var ChartController;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('EagleEyeWebService', function($q) {
      var qGetChartById;

      var getChartById = jasmine.createSpy('getChartById').and.callFake(function(chartId) {
        qGetChartById = $q.defer();

        return qGetChartById.promise;
      });

      return {
        getChartById: getChartById,
        resolveGetChartById: function(value) { qGetChartById.resolve(value); },
        rejectGetChartById: function(reason) { qGetChartById.reject(reason); }
      };
    });

    $provide.factory('eeShareService', function() {
      return {
        showShareDialog: jasmine.createSpy('showShareDialog')
      };
    });

    $provide.factory('eeSaveAsPDFService', function() {
      return {
        SaveImageOrPDF: jasmine.createSpy('SaveImageOrPDF')
      };
    });

    $provide.factory('$stateParams', function() {
      return { id: 'id' };
    });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$stateParams_, _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_, _eeShareService_, _eeSaveAsPDFService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    eeShareService = _eeShareService_;
    eeSaveAsPDFService = _eeSaveAsPDFService_;
  }));

  beforeEach(function () {
    ChartController = $controller('ChartController', {
      $stateParams: $stateParams,
      $location: $location,
      $interval: $interval,
      EagleEyeWebService: EagleEyeWebService,
      eeShareService: eeShareService,
      eeSaveAsPDFService: eeSaveAsPDFService
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartController).toBeDefined();
  });

  it('should initialize data models', function() {
    expect(ChartController.id).toBe('id');
    expect(ChartController.autoReloadChartPromise).toBe(null);
    expect(ChartController.isAutoReloadSwitchOn).toBe(false);
    expect(ChartController.delay).toBe(10 * 1000);
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
    ChartController.delay = 1000;
    ChartController.startAutoReloadChart();
    expect(ChartController.autoReloadChartPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartController.loadChart).toHaveBeenCalledWith('id');
  });

  it('should stop an interval task with stopAutoReloadChart()', function() {
    spyOn(ChartController, 'loadChart');
    spyOn($interval, 'cancel').and.callThrough();
    ChartController.delay = 1000;
    ChartController.startAutoReloadChart();
    expect(ChartController.autoReloadChartPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartController.stopAutoReloadChart()).toBe(true);
    expect($interval.cancel).toHaveBeenCalledWith(ChartController.autoReloadChartPromise);
  });

  it('should show share dialog when calls showShare()', function() {
    spyOn($location, 'absUrl').and.returnValue('eagleeye');
    ChartController.showShare('title');
    expect(eeShareService.showShareDialog).toHaveBeenCalledWith({
      sharedTitle: 'title',
      sharedLink: 'eagleeye'
    });
  });

  it('should be able to save chart as PDF', function() {
    ChartController.SaveImageOrPDF(0, {});
    expect(eeSaveAsPDFService.SaveImageOrPDF).toHaveBeenCalledWith(0, {});
  });
});
