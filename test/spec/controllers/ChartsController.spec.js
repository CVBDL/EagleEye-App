'use strict';

describe('Controller: ChartsController', function() {
  var $controller,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    EagleEyeWebService,
    EEDialogService;

  var ChartsController,
    getChartsRequestHandler;

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
    getChartsRequestHandler = $httpBackend.when('GET', '/api/v1/charts').respond([
      { _id: 1 },
      { _id: 2 }
    ]);
    $httpBackend.when('DELETE', '/api/v1/charts/1').respond('');
  });

  beforeEach(inject(function() {
    ChartsController = $controller('ChartsController', {
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
    expect(ChartsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should set default isLoading model', function() {
      expect(ChartsController.isLoading).toBe(true);
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch all charts', function() {
      $httpBackend.expect('GET', '/api/v1/charts');
      $httpBackend.flush();
    });

    it('should set `isLoading` and `chartList` models when request success', function() {
      $httpBackend.flush();

      expect(ChartsController.isLoading).toBe(false);
      expect(ChartsController.chartList).toEqual([
        { _id: 1 },
        { _id: 2 }
      ]);
    });

    it('should do nothing when request error', function() {
      ChartsController.isLoading = (true);
      ChartsController.chartList = ([]);

      getChartsRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartsController.isLoading).toBe(true);
      expect(ChartsController.chartList).toEqual([]);
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('init()', function() {

      it('should call loadChartList() to fetch charts', function() {
        spyOn(ChartsController, 'loadChartList');

        ChartsController.init();

        expect(ChartsController.loadChartList).toHaveBeenCalled();
      });
    });

    describe('loadChartList()', function() {

      it('should make a GET request to fetch all charts', function() {
        ChartsController.loadChartList();

        $httpBackend.expect('GET', '/api/v1/charts');
        $httpBackend.flush();
      });

      it('should set `isLoading` and `chartList` models when request success', function() {
        ChartsController.isLoading = true;
        ChartsController.chartList = [];

        ChartsController.loadChartList();
        getChartsRequestHandler.respond([
          { _id: 1 },
          { _id: 2 }
        ]);
        $httpBackend.flush();

        expect(ChartsController.isLoading).toBe(false);
        expect(ChartsController.chartList).toEqual([
          { _id: 1 },
          { _id: 2 }
        ]);
      });
    });

    describe('onClickDeleteChart()', function() {
      var $event,
        chart;

      beforeEach(function() {
        spyOn(ChartsController, 'loadChartList');

        $event = {
          stopPropagation: jasmine.createSpy('stopPropagation')
        };

        chart = {
          _id: '1',
          options: { title: 'title' }
        }
      });

      it('should stop default event propagation', function() {
        ChartsController.onClickDeleteChart($event, chart);
        expect($event.stopPropagation).toHaveBeenCalled();
      });

      it('should show confirm dialog before delete', function() {
        ChartsController.onClickDeleteChart($event, chart);
        expect(EEDialogService.showDeleteConfirmation).toHaveBeenCalledWith({ title: 'title' });
      });

      it('should cancel delete if user click cancel', function() {
        ChartsController.onClickDeleteChart($event, chart);
        EEDialogService.rejectShowDeleteConfirmation();
        $rootScope.$digest();
        expect(EagleEyeWebService.deleteChartById).not.toHaveBeenCalled();
        expect(ChartsController.loadChartList).not.toHaveBeenCalled();
      });

      it('should delete the chart if user click ok', function() {
        ChartsController.onClickDeleteChart($event, chart);
        EEDialogService.resolveShowDeleteConfirmation();
        $httpBackend.expect('DELETE', '/api/v1/charts/1');
        $rootScope.$digest();
        $httpBackend.flush();
      });

      it('should refresh chart list after delete a chart', function() {
        ChartsController.onClickDeleteChart($event, chart);
        EEDialogService.resolveShowDeleteConfirmation();
        $rootScope.$digest();
        $httpBackend.flush();
        expect(ChartsController.loadChartList).toHaveBeenCalled();
      });
    });

    describe('createChart()', function() {
      it('should go to chartCreation state', function() {
        spyOn($state, 'go');

        ChartsController.createChart();
        expect($state.go).toHaveBeenCalledWith('chartCreation');
      });
    });
  });
});
