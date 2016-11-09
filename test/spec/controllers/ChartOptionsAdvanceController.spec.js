'use strict';

describe('Controller: ChartOptionsAdvanceController', function() {
  var $controller,
    $httpBackend,
    $state,
    $stateParams,
    $window,
    EagleEyeWebService;

  var ChartOptionsAdvanceController,
    getChartByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: '1' };
    });

    $provide.factory('$window', function() {
      return {
        alert: jasmine.createSpy('alert')
      };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$state_, _$stateParams_, _$window_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $window = _$window_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    getChartByIdRequestHandler = $httpBackend.when('GET', '/api/v1/charts/1').respond({
      _id: '1',
      options: {
        title: 'foo'
      }
    });
    $httpBackend.when('PUT', '/api/v1/charts/1').respond({});
  });

  beforeEach(inject(function() {
    ChartOptionsAdvanceController = $controller('ChartOptionsAdvanceController', {
      $state: $state,
      $stateParams: $stateParams,
      $window: $window,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartOptionsAdvanceController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartOptionsAdvanceController.id).toBe('1');
    });

    it('should initialize `chartOptionsString` model', function() {
      expect(ChartOptionsAdvanceController.chartOptionsString).toBe('');
    });

    it('should initialize `title` model', function() {
      expect(ChartOptionsAdvanceController.title).toBe('');
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch chart using initial `ChartOptionsAdvanceController.id`', function() {
      $httpBackend.expect('GET', '/api/v1/charts/1');
      $httpBackend.flush();
    });

    it('should set models when request success', function() {
      getChartByIdRequestHandler.respond({
        _id: '1',
        options: {
          title: 'foo'
        }
      });
      $httpBackend.flush();

      expect(ChartOptionsAdvanceController.id).toBe('1');
      expect(ChartOptionsAdvanceController.title).toBe('foo');
      expect(ChartOptionsAdvanceController.chartOptionsString).toBe(JSON.stringify({
        options: { title: 'foo' }
      }));
    });

    it('should do nothing when request error', function() {
      ChartOptionsAdvanceController.id = '';
      ChartOptionsAdvanceController.title = '';
      ChartOptionsAdvanceController.chartOptionsString = '';

      getChartByIdRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartOptionsAdvanceController.id).toBe('');
      expect(ChartOptionsAdvanceController.title).toBe('');
      expect(ChartOptionsAdvanceController.chartOptionsString).toBe('');
    });
  });

  describe('on runtime', function() {

    describe('save()', function() {

      beforeEach(function() {
        spyOn(JSON, 'parse').and.callThrough();
      });

      it('should alart error if input an invalid JSON', function() {
        ChartOptionsAdvanceController.save();
        expect($window.alert).toHaveBeenCalledWith('JSON syntax error!');
        expect(EagleEyeWebService.updateChartById).not.toHaveBeenCalled();
        $httpBackend.flush();
      });

      it('should update chart to server with valid JSON', function() {
        spyOn($state, 'go');

        ChartOptionsAdvanceController.id = '1';

        ChartOptionsAdvanceController.save('"foo"');

        expect($window.alert).not.toHaveBeenCalled();
        $httpBackend.expect('PUT', '/api/v1/charts/1', '"foo"');
        $httpBackend.flush();
      });

      it('should navigate to chart when request success', function() {
        spyOn($state, 'go');

        ChartOptionsAdvanceController.id = '1';

        ChartOptionsAdvanceController.save('"foo"');
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('chart', { id: '1' });
      });
    });
  });
});
