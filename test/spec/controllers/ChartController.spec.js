'use strict';

describe('Controller: ChartController', function() {
  var $controller,
    $q,
    $rootScope,
    $stateParams,
    $httpBackend,
    $location,
    $interval,
    EagleEyeWebService,
    EEDialogService,
    SaveAsPDFService;

  var ChartController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load EagleEyeWebService mock module
  beforeEach(module('EEDialogServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
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

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$stateParams_, _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_, _EEDialogService_, _SaveAsPDFService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    EEDialogService = _EEDialogService_;
    SaveAsPDFService = _SaveAsPDFService_;
  }));

  beforeEach(function() {
    ChartController = $controller('ChartController', {
      $stateParams: $stateParams,
      $location: $location,
      $interval: $interval,
      EagleEyeWebService: EagleEyeWebService,
      EEDialogService: EEDialogService,
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

  it('should initialize `id` model', function() {
    expect(ChartController.id).toBe('id');
  });

  it('should initialize `DELAY` model to one minute', function() {
    expect(ChartController.DELAY).toBe(60 * 1000);
  });

  it('should initialize `isAutoReloadSwitchOn` model to false', function() {
    expect(ChartController.isAutoReloadSwitchOn).toBe(false);
  });

  it('should initialize `autoReloadChartPromise` model to null', function() {
    expect(ChartController.autoReloadChartPromise).toBeNull();
  });

  it('should initialize `chart` model', function() {
    expect(ChartController.chart).not.toBeNull();
    expect(typeof ChartController.chart).toBe('object');
  });

  it('should call init() to setup `chart` model when controller is created', function() {
    var chart = { foo: 'foo'};

    EagleEyeWebService.chart = {};

    EagleEyeWebService.resolveGetChartById(chart);
    $rootScope.$digest();

    expect(ChartController.chart).toEqual(chart);
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
    it('should make use of EagleEyeWebService to fetch chart data', function() {
      ChartController.loadChart('id');

      expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
    });

    it('should set `chart` model after fetching chart', function() {
      var chart = { foo: 'foo'};

      ChartController.chart = {};

      ChartController.loadChart('id');
      EagleEyeWebService.resolveGetChartById(chart);
      $rootScope.$digest();

      expect(ChartController.chart).toEqual(chart);
    });
  });

  describe('onAutoReloadSwitchChange()', function() {
    beforeEach(function() {
      spyOn(ChartController, 'startAutoReloadChart');
      spyOn(ChartController, 'stopAutoReloadChart');
    });

    it('should return directly if not passing `isAutoReloadSwitchOn` param', function() {
      ChartController.onAutoReloadSwitchChange();

      expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
    });

    it('should call `startAutoReloadChart()` to start interval if passing isAutoReloadSwitchOn = true', function() {
      ChartController.onAutoReloadSwitchChange(true);

      expect(ChartController.startAutoReloadChart).toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
    });

    it('should call `stopAutoReloadChart()` to cancel interval if passing isAutoReloadSwitchOn = false', function() {
      ChartController.onAutoReloadSwitchChange(false);

      expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
      expect(ChartController.stopAutoReloadChart).toHaveBeenCalled();
    });
  });

  describe('startAutoReloadChart()', function() {
    it('should return a promise which will be notified on each iteration', function() {
      ChartController.autoReloadChartPromise = null;

      ChartController.startAutoReloadChart();

      expect(typeof ChartController.autoReloadChartPromise.then).toBe('function');
    });

    it('should trigger reload chart every second', function() {
      spyOn(ChartController, 'loadChart');
      ChartController.DELAY = 1000;
      ChartController.id = 'id';

      ChartController.startAutoReloadChart();
      $interval.flush(1000);

      expect(ChartController.loadChart).toHaveBeenCalledWith('id');

      $interval.flush(1000);

      expect(ChartController.loadChart).toHaveBeenCalledWith('id');
      expect(ChartController.loadChart).toHaveBeenCalledTimes(2);
    });
  });

  describe('stopAutoReloadChart()', function() {
    it('should call cancel the interval task via `autoReloadChartPromise`', function() {
      var mockPromise = { then: function() {} };

      spyOn($interval, 'cancel').and.callThrough();
      ChartController.autoReloadChartPromise = mockPromise;

      ChartController.stopAutoReloadChart();

      expect($interval.cancel).toHaveBeenCalledWith(mockPromise);
    });

    it('should return false if the task is not successfully cancelled', function() {
      var result;

      ChartController.autoReloadChartPromise = null;

      result = ChartController.stopAutoReloadChart();

      expect(result).toBe(false);
    });

    it('should return true if the task is successfully cancelled', function() {
      var result;

      spyOn(ChartController, 'loadChart');
      ChartController.DELAY = 1000;
      ChartController.startAutoReloadChart();
      $interval.flush(1000);

      result = ChartController.stopAutoReloadChart();

      expect(result).toBe(true);
    });
  });

  describe('showShare()', function() {
    it('should use EEDialogService to show a sharing dialog', function() {
      spyOn($location, 'absUrl').and.returnValue('eagleeye');

      ChartController.showShare('title');

      expect(EEDialogService.showSharing).toHaveBeenCalledWith({
        sharedTitle: 'title',
        sharedLink: 'eagleeye'
      });
    });
  });

  describe('SaveImageOrPDF()', function() {
    it('should use SaveAsPDFService to save chart as PDF', function() {
      ChartController.SaveImageOrPDF(0, {});

      expect(SaveAsPDFService.SaveImageOrPDF).toHaveBeenCalledWith(0, {});
    });
  });
});
