'use strict';

describe('Controller: ChartOptionsAdvanceController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $stateParams,
    $window,
    EagleEyeWebService;

  var ChartOptionsAdvanceController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('GoogleChartsService', function() {
      var makeChartType = jasmine.createSpy('makeChartType').and.callFake(function(chartType) {
        return 'LineChart';
      });
      var makeDomainDataType = jasmine.createSpy('makeDomainDataType').and.callFake(function(domainDataType) {
        return 'string';
      });
      var makeFriendlyUrl = jasmine.createSpy('makeFriendlyUrl').and.callFake(function(type, url) {
        return 'c-friendly-url';
      });
      var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function(chartType, domainDataType) {
        return {};
      });
      var makeConfigurationOptions = jasmine.createSpy('makeConfigurationOptions').and.callFake(function(chartType, options) {
        return {};
      });

      return {
        makeChartType: makeChartType,
        makeDomainDataType: makeDomainDataType,
        makeFriendlyUrl: makeFriendlyUrl,
        getChartDataTableSamples: getChartDataTableSamples,
        makeConfigurationOptions: makeConfigurationOptions,
      };
    });

    $provide.factory('$stateParams', function() {
      return {
        id: 'id'
      };
    });

    $provide.factory('$window', function() {
      return {
        alert: jasmine.createSpy('alert')
      };
    });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$stateParams_, _$window_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $window = _$window_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(inject(function($controller, $rootScope) {
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
  });

  it('should initialize data models', function() {
    spyOn(JSON, 'stringify').and.callThrough();

    expect(ChartOptionsAdvanceController.id).toBe('id');
    expect(ChartOptionsAdvanceController.chartOptionsString).toBe('');
    expect(ChartOptionsAdvanceController.title).toBe('');
    expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith('id');
    EagleEyeWebService.resolveGetChartById({
      _id: '_id',
      options: {
        title: 'title'
      }
    });
    $rootScope.$digest();
    expect(JSON.stringify).toHaveBeenCalledWith({
      options: {
        title: 'title'
      }
    });
    expect(ChartOptionsAdvanceController.id).toBe('_id');
    expect(ChartOptionsAdvanceController.title).toBe('title');
    expect(ChartOptionsAdvanceController.chartOptionsString).toBe('{"options":{"title":"title"}}');
  });

  describe('save()', function() {
    beforeEach(function() {
      spyOn(JSON, 'parse');
    });

    it('should alart error if input an invalid JSON', function() {
      JSON.parse.and.callFake(function() {
        throw new Error();
      });

      ChartOptionsAdvanceController.save();
      expect($window.alert).toHaveBeenCalledWith('JSON syntax error!');
      expect(EagleEyeWebService.updateChartById).not.toHaveBeenCalled();
    });

    it('should update chart to server with valid JSON', function() {
      JSON.parse.and.returnValue({ id: 'id' });
      ChartOptionsAdvanceController.id = 'id';

      ChartOptionsAdvanceController.save();
      expect($window.alert).not.toHaveBeenCalled();
      expect(EagleEyeWebService.updateChartById).toHaveBeenCalledWith('id', { id: 'id' });
    });

    it('should to go chart after update chart to server', function() {
      spyOn($state, 'go');

      ChartOptionsAdvanceController.id = 'id';

      ChartOptionsAdvanceController.save();
      expect($window.alert).not.toHaveBeenCalled();
      EagleEyeWebService.resolveUpdateChartById();
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalledWith('chart', { id: 'id' });
    });
  });
});
