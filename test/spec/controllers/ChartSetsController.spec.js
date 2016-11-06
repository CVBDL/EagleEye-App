'use strict';

describe('Controller: ChartSetsController', function() {
  var $controller,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    EagleEyeWebService,
    EEDialogService;

  var ChartSetsController,
    getChartSetsRequestHandler,
    deleteChartSetByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load EEDialogService mock module
  beforeEach(module('EEDialogServiceMock'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$state_, _$httpBackend_, _EagleEyeWebService_, _EEDialogService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    EEDialogService = _EEDialogService_;
  }));

  beforeEach(function() {
    getChartSetsRequestHandler = $httpBackend.when('GET', '/api/v1/chart-sets').respond([]);
    deleteChartSetByIdRequestHandler = $httpBackend.when('DELETE', '/api/v1/chart-sets/1').respond(204);
  });

  beforeEach(inject(function() {
    ChartSetsController = $controller('ChartSetsController', {
      $state: $state,
      EagleEyeWebService: EagleEyeWebService,
      EEDialogService: EEDialogService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSetsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `isLoading` model', function() {
      expect(ChartSetsController.isLoading).toBe(true);
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch all chart sets', function() {
      $httpBackend.expect('GET', '/api/v1/chart-sets');
      $httpBackend.flush();
    });

    it('should set `isLoading` and `chartSetList` models when request success', function() {
      var chartSetList = [
        { _id: 1, foo: 'foo' },
        { _id: 2, bar: 'bar' }
      ];

      getChartSetsRequestHandler.respond(chartSetList);
      $httpBackend.flush();

      expect(ChartSetsController.isLoading).toBe(false);
      expect(ChartSetsController.chartSetList).toEqual(chartSetList);
    });

    it('should do nothing when request error', function() {
      ChartSetsController.isLoading = true;
      ChartSetsController.chartSetList = [];

      getChartSetsRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartSetsController.isLoading).toBe(true);
      expect(ChartSetsController.chartSetList).toEqual([]);
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('loadChartSetList()', function() {

      it('should make a GET request to fetch all chart sets', function() {
        ChartSetsController.loadChartSetList();

        $httpBackend.expect('GET', '/api/v1/chart-sets');
        $httpBackend.flush();
      });

      it('should set `isLoading` and `chartSetList` models when request success', function() {
        var chartSetList = [
          { _id: 1, foo: 'foo' },
          { _id: 2, bar: 'bar' }
        ];

        ChartSetsController.loadChartSetList();
        getChartSetsRequestHandler.respond(chartSetList);
        $httpBackend.flush();

        expect(ChartSetsController.isLoading).toBe(false);
        expect(ChartSetsController.chartSetList).toEqual(chartSetList);
      });

      it('should do nothing when request error', function() {
        ChartSetsController.isLoading = true;
        ChartSetsController.chartSetList = [];

        ChartSetsController.loadChartSetList();
        getChartSetsRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSetsController.isLoading).toBe(true);
        expect(ChartSetsController.chartSetList).toEqual([]);
      });
    });

    describe('onClickDeleteChartSet()', function() {
      var $event,
        chartset;

      beforeEach(function() {
        spyOn(ChartSetsController, 'loadChartSetList').and.callThrough();

        $event = {
          stopPropagation: jasmine.createSpy('stopPropagation')
        };

        chartset = {
          _id: '1',
          title: 'title'
        }
      });

      it('should stop default event propagation', function() {
        ChartSetsController.onClickDeleteChartSet($event, chartset);
        expect($event.stopPropagation).toHaveBeenCalled();
      });

      it('should show confirm dialog before delete', function() {
        ChartSetsController.onClickDeleteChartSet($event, chartset);
        expect(EEDialogService.showDeleteConfirmation).toHaveBeenCalledWith({ title: 'title' });
      });

      it('should cancel delete if user click cancel', function() {
        ChartSetsController.onClickDeleteChartSet($event, chartset);
        EEDialogService.rejectShowDeleteConfirmation();
        $rootScope.$digest();
        expect(EagleEyeWebService.deleteChartSetById).not.toHaveBeenCalled();
        expect(ChartSetsController.loadChartSetList).not.toHaveBeenCalled();
      });

      it('should delete the chart if user click ok', function() {
        ChartSetsController.onClickDeleteChartSet($event, chartset);
        $httpBackend.expect('DELETE', '/api/v1/chart-sets/1');
        EEDialogService.resolveShowDeleteConfirmation();
        $httpBackend.flush();
      });

      it('should refresh chart list after delete a chart', function() {
        ChartSetsController.onClickDeleteChartSet($event, chartset);
        EEDialogService.resolveShowDeleteConfirmation();
        $httpBackend.expect('GET', '/api/v1/chart-sets');
        $rootScope.$digest();
        $httpBackend.flush();
      });
    });

    describe('createChartSet()', function() {
      it('should go to chartSetCreation state', function() {
        spyOn($state, 'go');

        ChartSetsController.createChartSet();
        expect($state.go).toHaveBeenCalledWith('chartSetCreation');
      });
    });
  });
});