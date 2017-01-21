'use strict';

describe('Controller: TasksController', function() {
  var $controller,
    $httpBackend,
    $stateParams,
    EagleEyeWebService;

  var TasksController;

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
        saveImageOrPDF: jasmine.createSpy('saveImageOrPDF')
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

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$stateParams_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $stateParams = _$stateParams_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    $httpBackend.when('GET', '/api/v1/jobs/1').respond({ _id: '1' });
    $httpBackend.when('GET', '/api/v1/jobs/1/tasks').respond([{
      _id: '1'
    }]);
  });

  beforeEach(inject(function() {
    TasksController = $controller('TasksController', {
      $stateParams: $stateParams,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(TasksController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    it('should initialize models', function() {
      expect(TasksController.job).toEqual({});
      expect(TasksController.tasks).toEqual([]);
      $httpBackend.flush();
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch job data', function() {
      $httpBackend.expect('GET', '/api/v1/jobs/1');

      $httpBackend.flush();

      expect(TasksController.job).toEqual({ _id: '1' });
    });
  });

});
