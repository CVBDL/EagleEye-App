'use strict';

describe('Controller: ChartSetController', function () {
  var $controller,
    $q,
    $rootScope,
    $state,
    $stateParams,
    $httpBackend,
    $location,
    $interval,
    EagleEyeWebService,
    eeShareService,
    eeSaveAsPDFService;

  var ChartSetController;

  // load main module
  beforeEach(module('eagleeye'))

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('EagleEyeWebService', function($q) {
      var qGetChartSetById,
        qGetChartSets;

      var getChartSetById = jasmine.createSpy('getChartSetById').and.callFake(function(chartId) {
        qGetChartSetById = $q.defer();

        return qGetChartSetById.promise;
      });
      var getChartSets = jasmine.createSpy('getChartSets').and.callFake(function(chartId) {
        qGetChartSets = $q.defer();

        return qGetChartSets.promise;
      });

      return {
        getChartSetById: getChartSetById,
        resolveGetChartSetById: function(value) { qGetChartSetById.resolve(value); },
        rejectGetChartSetById: function(reason) { qGetChartSetById.reject(reason); },
        getChartSets: getChartSets,
        resolveGetChartSets: function(value) { qGetChartSets.resolve(value); },
        rejectGetChartSets: function(reason) { qGetChartSets.reject(reason); }
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

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$state_, _$stateParams_, _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_, _eeShareService_, _eeSaveAsPDFService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    eeShareService = _eeShareService_;
    eeSaveAsPDFService = _eeSaveAsPDFService_;
  }));

  beforeEach(function () {
    ChartSetController = $controller('ChartSetController', {
      $location: $location,
      $rootScope: $rootScope,
      $state: $state,
      $stateParams: $stateParams,
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
    expect(ChartSetController).toBeDefined();
  });

  it('should set DELAY constant value', function() {
    expect(ChartSetController.DELAY).toBe(60 * 1000);
  });

  it('should initialize data models', function() {
    expect(ChartSetController.id).toBe('id');
    expect(ChartSetController.autoReloadChartSetPromise).toBe(null);
    expect(ChartSetController.isAutoReloadSwitchOn).toBe(false);
    expect(ChartSetController.chartset).toBeDefined();
    expect(ChartSetController.chartSetList).toBeDefined();
  });

  it('should call init() to initialize controller', function() {
    expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
  });

  describe('init()', function() {
    it('should call loadChartSet() to get chart info', function() {
      spyOn(ChartSetController, 'loadChartSet');
      ChartSetController.id = 'id';
      ChartSetController.init();
      expect(ChartSetController.loadChartSet).toHaveBeenCalledWith('id');
    });
  });

  describe('loadChartSet()', function() {
    it('should call EagleEyeWebService to fetch chart set data', function() {
      ChartSetController.loadChartSet('id');
      expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
    });

    it('should set controller chart model after fetching chart', function() {
      ChartSetController.loadChartSet('id');
      expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
      EagleEyeWebService.resolveGetChartSetById({ id: 'id' });
      $rootScope.$digest();
      expect(ChartSetController.chartset).toEqual({ id: 'id' });
    });
  });

  describe('loadChartSets()', function() {
    it('should call EagleEyeWebService to fetch chart sets data', function() {
      ChartSetController.loadChartSets();
      expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
    });

    it('should set controller chart model after fetching chart', function() {
      ChartSetController.loadChartSets();
      expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
      EagleEyeWebService.resolveGetChartSets([]);
      $rootScope.$digest();
      expect(ChartSetController.chartSetList).toEqual([]);
    });
  });

  describe('setViewMode()', function() {
    beforeEach(function() {
      spyOn($rootScope, '$emit');
    });

    it('should do nothing if passing invalid mode', function() {
      ChartSetController.setViewMode();
      expect(ChartSetController.viewMode).not.toBe(undefined);
      expect($rootScope.$emit).not.toHaveBeenCalled();
    });

    it('should set display mode to list', function() {
      ChartSetController.setViewMode('list');
      expect(ChartSetController.viewMode).toBe('list');
      expect($rootScope.$emit).toHaveBeenCalledWith('ee.googlechart.redraw');
    });

    it('should set display mode to column', function() {
      ChartSetController.setViewMode('column');
      expect(ChartSetController.viewMode).toBe('column');
      expect($rootScope.$emit).toHaveBeenCalledWith('ee.googlechart.redraw');
    });
  });

  describe('onAutoReloadSwitchChange()', function() {
    beforeEach(function() {
      spyOn(ChartSetController, 'startAutoReloadChartSet');
      spyOn(ChartSetController, 'stopAutoReloadChartSet');
    });

    it('should return if none parameter passed in', function() {
      expect(ChartSetController.onAutoReloadSwitchChange()).not.toBeDefined();
      expect(ChartSetController.startAutoReloadChartSet).not.toHaveBeenCalled();
      expect(ChartSetController.stopAutoReloadChartSet).not.toHaveBeenCalled();
    });

    it('should start auto reload if passing isAutoReloadSwitchOn = true', function() {
      ChartSetController.onAutoReloadSwitchChange(true);
      expect(ChartSetController.startAutoReloadChartSet).toHaveBeenCalled();
      expect(ChartSetController.stopAutoReloadChartSet).not.toHaveBeenCalled();
    });

    it('should stop auto reload if passing isAutoReloadSwitchOn = false', function() {
      ChartSetController.onAutoReloadSwitchChange(false);
      expect(ChartSetController.startAutoReloadChartSet).not.toHaveBeenCalled();
      expect(ChartSetController.stopAutoReloadChartSet).toHaveBeenCalled();
    });
  });

  it('should register an interval task with startAutoReloadChartSet()', function() {
    spyOn(ChartSetController, 'loadChartSet');
    ChartSetController.id = 'id';
    ChartSetController.DELAY = 1000;
    ChartSetController.startAutoReloadChartSet();
    expect(ChartSetController.autoReloadChartSetPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartSetController.loadChartSet).toHaveBeenCalledWith('id');
  });

  it('should stop an interval task with stopAutoReloadChartSet()', function() {
    spyOn(ChartSetController, 'loadChartSet');
    spyOn($interval, 'cancel').and.callThrough();
    ChartSetController.DELAY = 1000;
    ChartSetController.startAutoReloadChartSet();
    expect(ChartSetController.autoReloadChartSetPromise.then).toBeDefined();
    $interval.flush(1000);
    expect(ChartSetController.stopAutoReloadChartSet()).toBe(true);
    expect($interval.cancel).toHaveBeenCalledWith(ChartSetController.autoReloadChartSetPromise);
  });

  it('should show share dialog when calls showShare()', function() {
    spyOn($location, 'absUrl').and.returnValue('eagleeye');
    ChartSetController.showShare('title');
    expect(eeShareService.showShareDialog).toHaveBeenCalledWith({
      sharedTitle: 'title',
      sharedLink: 'eagleeye'
    });
  });

  it('should go to chartSet state when called goToChartSet()', function() {
    spyOn($state, 'go');
    ChartSetController.goToChartSet('id');
    expect($state.go).toHaveBeenCalledWith('chartSet', { id: 'id' });
  });
});
