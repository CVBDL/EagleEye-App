'use strict';

describe('Controller: JobsController', function() {
  var $controller,
    $filter,
    $httpBackend,
    $state,
    EagleEyeWebService;

  var JobsController,
    getJobsRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load ngMaterial mock module
  beforeEach(module('ngMaterialMock'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$filter_, _$httpBackend_, _$state_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $filter = _$filter_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    getJobsRequestHandler = $httpBackend.when('GET', '/api/v1/jobs').respond([
      { _id: 1 },
      { _id: 2 }
    ]);
    $httpBackend.when('DELETE', '/api/v1/jobs/1').respond(204);
  });

  beforeEach(inject(function() {
    JobsController = $controller('JobsController', {
      $state: $state,
      $filter: $filter,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(JobsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should set default jobs model', function() {
      expect(JobsController.jobs).toEqual([]);
    });

    it('should set default isLoading model', function() {
      expect(JobsController.isLoading).toBe(true);
    });

    it('should set default totalJobs model', function() {
      expect(JobsController.totalJobs).toBe(0);
    });

    it('should set default failedJobs model', function() {
      expect(JobsController.failedJobs).toBe(0);
    });

    it('should set default lastUpdatedAt model', function() {
      expect(JobsController.lastUpdatedAt).toBeNull();
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch all jobs', function() {
      $httpBackend.expect('GET', '/api/v1/jobs');
      $httpBackend.flush();
    });

    it('should set `lastUpdatedAt` when request success', function() {
      expect(JobsController.lastUpdatedAt).toBeNull();

      $httpBackend.flush();

      expect(JobsController.lastUpdatedAt instanceof Date).toBe(true);
    });

    it('should set `isLoading` to `false` when request success', function() {
      $httpBackend.flush();

      expect(JobsController.isLoading).toBe(false);
    });

    it('should set `jobs` when request success', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' }
      ];

      getJobsRequestHandler.respond(jobs);
      $httpBackend.flush();

      expect(JobsController.jobs).toEqual(jobs);
    });

    it('should calculate `totalJobs` when request success', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' }
      ];

      getJobsRequestHandler.respond(jobs);
      $httpBackend.flush();

      expect(JobsController.totalJobs).toBe(2);
    });

    it('should calculate `failedJobs` when request success', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' }
      ];

      getJobsRequestHandler.respond(jobs);
      $httpBackend.flush();

      expect(JobsController.failedJobs).toBe(1);
    });
  });

});
