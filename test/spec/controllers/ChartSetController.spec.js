'use strict';

describe('Controller: ChartSetController', function() {
  var $controller,
    $httpBackend,
    $interval,
    $location,
    $mdDialog,
    $rootScope,
    $state,
    $stateParams,
    EagleEyeWebService,
    EEDialogService,
    SaveAsPDFService;

  var ChartSetController,
    getChartSetsRequestHandler,
    getChartSetByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load ngMaterial mock module
  beforeEach(module('ngMaterialMock'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('SaveAsPDFService', function() {
      return {
        SaveImageOrPDF: jasmine.createSpy('SaveImageOrPDF')
      };
    });

    $provide.factory('$stateParams', function() {
      return { id: '1' };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(
      _$controller_, _$mdDialog_, _$rootScope_, _$state_, _$stateParams_,
      _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_,
      _EEDialogService_, _SaveAsPDFService_) {

    $controller = _$controller_;
    $mdDialog = _$mdDialog_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    EEDialogService = _EEDialogService_;
    SaveAsPDFService = _SaveAsPDFService_;
  }));

  beforeEach(function() {
    getChartSetsRequestHandler = $httpBackend.when('GET', '/api/v1/chart-sets').respond([]);
    getChartSetByIdRequestHandler = $httpBackend.when('GET', '/api/v1/chart-sets/1').respond([]);
  });

  beforeEach(function() {
    ChartSetController = $controller('ChartSetController', {
      $location: $location,
      $rootScope: $rootScope,
      $state: $state,
      $stateParams: $stateParams,
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
    expect(ChartSetController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartSetController.id).toBe('1');
    });

    it('should initialize `DELAY` model to one minute', function() {
      expect(ChartSetController.DELAY).toBe(60 * 1000);
    });

    it('should initialize `viewMode` model to "list"', function() {
      expect(ChartSetController.viewMode).toBe('list');
    });

    it('should initialize `isAutoReloadSwitchOn` model to false', function() {
      expect(ChartSetController.isAutoReloadSwitchOn).toBe(false);
    });

    it('should initialize `autoReloadChartSetPromise` model to null', function() {
      expect(ChartSetController.autoReloadChartSetPromise).toBeNull();
    });

    it('should initialize `saveChartSetAsPdf` to use SaveAsPDFService', function() {
      expect(ChartSetController.saveChartSetAsPdf).toBe(SaveAsPDFService.saveChartSetAsPdf);
    });

    it('should initialize `chartset` model to {}', function() {
      expect(ChartSetController.chartset).toEqual({});
    });

    it('should initialize `chartSetList` model to []', function() {
      expect(ChartSetController.chartSetList).toEqual([]);
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch chart set using initial `ChartSetController.id`', function() {
      $httpBackend.expect('GET', '/api/v1/chart-sets/1');
      $httpBackend.flush();
    });

    it('should set `chartset` model when request success', function() {
      var chartset = { _id: '1' };

      getChartSetByIdRequestHandler.respond(chartset);
      $httpBackend.flush();

      expect(ChartSetController.chartset).toEqual(chartset);
    });

    it('should do nothing when request error', function() {
      ChartSetController.chartset = {};

      getChartSetByIdRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartSetController.chartset).toEqual({});
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('loadChartSet()', function() {

      it('should make a GET request to fetch chart set by id', function() {
        var id = 1;

        ChartSetController.loadChartSet(id);

        $httpBackend.expect('GET', '/api/v1/chart-sets/1');
        $httpBackend.flush();
      });

      it('should set `chartset` model when request success', function() {
        var id = 1,
          chartset = { _id: 1, foo: 'foo' };

        ChartSetController.loadChartSet(id);
        getChartSetByIdRequestHandler.respond(chartset);
        $httpBackend.flush();

        expect(ChartSetController.chartset).toEqual(chartset);
      });

      it('should do nothing when request error', function() {
        var id = 1;

        ChartSetController.chartset = {};

        ChartSetController.loadChartSet(id);
        getChartSetByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSetController.chartset).toEqual({});
      });
    });

    describe('loadChartSets()', function() {

      it('should make a GET request to fetch all chart sets', function() {
        ChartSetController.loadChartSets();

        $httpBackend.expect('GET', '/api/v1/chart-sets');
        $httpBackend.flush();
      });

      it('should set `chartSetList` model when request success', function() {
        var chartSetList = [
          { _id: 1, foo: 'foo' },
          { _id: 2, foo: 'bar' }
        ];

        ChartSetController.loadChartSets();
        getChartSetsRequestHandler.respond(chartSetList);
        $httpBackend.flush();

        expect(ChartSetController.chartSetList).toEqual(chartSetList);
      });

      it('should do nothing when request error', function() {
        ChartSetController.chartSetList = [];

        ChartSetController.loadChartSets();
        getChartSetsRequestHandler.respond(500);
        $httpBackend.flush();

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

    describe('startAutoReloadChartSet()', function() {

      it('should register an interval task with startAutoReloadChartSet()', function() {
        spyOn(ChartSetController, 'loadChartSet');
        ChartSetController.id = 'id';
        ChartSetController.DELAY = 1000;
        ChartSetController.startAutoReloadChartSet();
        expect(ChartSetController.autoReloadChartSetPromise.then).toBeDefined();
        $interval.flush(1000);
        expect(ChartSetController.loadChartSet).toHaveBeenCalledWith('id');
      });
    });

    describe('stopAutoReloadChartSet()', function() {

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
    });

    it('should show share dialog when calls showShare()', function() {
      spyOn($location, 'absUrl').and.returnValue('eagleeye');
      ChartSetController.showShare('title');

      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: {
          sharedTitle: 'title',
          sharedLink: 'eagleeye'
        },
        controller: 'ShareDialogController as ctrl',
        templateUrl: 'scripts/templates/share.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should go to chartSet state when called goToChartSet()', function() {
      spyOn($state, 'go');
      ChartSetController.goToChartSet('id');
      expect($state.go).toHaveBeenCalledWith('chartSet', { id: 'id' });
    });
  });
});
