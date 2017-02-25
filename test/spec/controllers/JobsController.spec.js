'use strict';

describe('Controller: JobsController', function() {
  var $controller,
    $filter,
    $httpBackend,
    $rootScope,
    $state,
    $templateCache,
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
  beforeEach(inject(function(
      _$controller_, _$filter_, _$httpBackend_, _$rootScope_, _$state_,
      _$templateCache_, _EagleEyeWebService_) {

    $controller = _$controller_;
    $filter = _$filter_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $templateCache = _$templateCache_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    getJobsRequestHandler = $httpBackend.when('GET', '/api/v1/jobs').respond([
      { _id: 1 },
      { _id: 2 }
    ]);
    $httpBackend.when('DELETE', '/api/v1/jobs/1').respond(204);
    $httpBackend.when('PUT', '/api/v1/jobs/1/restart').respond(204);
  });

  beforeEach(function() {
    $templateCache.put('views/job-details.html', '');
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

    it('should set default failureJobs model', function() {
      expect(JobsController.failureJobs).toBe(0);
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

    it('should calculate `failureJobs` when request success', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' }
      ];

      getJobsRequestHandler.respond(jobs);
      $httpBackend.flush();

      expect(JobsController.failureJobs).toBe(1);
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('loadJobs()', function() {

      it('should make a GET request to fetch all jobs', function() {
        $httpBackend.expect('GET', '/api/v1/jobs');

        JobsController.loadJobs();

        expect(JobsController.isLoading).toBe(true);
        $httpBackend.flush();
      });

      it('should set `jobs`, `isLoading` and `lastUpdatedAt` models when request success', function() {
        var jobs = [
          { _id: 1, lastState: 'success' },
          { _id: 2, lastState: 'failure' }
        ];

        JobsController.jobs = [];
        JobsController.isLoading = false;
        JobsController.lastUpdatedAt = null;

        JobsController.loadJobs();

        expect(JobsController.isLoading).toBe(true);

        getJobsRequestHandler.respond(jobs);
        $httpBackend.flush();

        expect(JobsController.jobs).toEqual(jobs);
        expect(JobsController.isLoading).toBe(false);
        expect(JobsController.lastUpdatedAt instanceof Date).toBe(true);
      });

      it('should calculate total jobs when request success', function() {
        var jobs = [
          { _id: 1, lastState: 'success' },
          { _id: 2, lastState: 'failure' },
          { _id: 3, lastState: 'success' }
        ];

        JobsController.jobs = [];
        JobsController.totalJobs = 0;

        JobsController.loadJobs();

        getJobsRequestHandler.respond(jobs);
        $httpBackend.flush();

        expect(JobsController.totalJobs).toEqual(3);
      });

      it('should calculate failure jobs when request success', function() {
        var jobs = [
          { _id: 1, lastState: 'success' },
          { _id: 2, lastState: 'failure' },
          { _id: 3, lastState: 'success' }
        ];

        JobsController.jobs = [];
        JobsController.failureJobs = 0;

        JobsController.loadJobs();

        getJobsRequestHandler.respond(jobs);
        $httpBackend.flush();

        expect(JobsController.failureJobs).toEqual(1);
      });
    });

    describe('deleteJob()', function() {

      it('should make a DELETE request to delete a job by its _id', function() {
        var jobId = '1';

        spyOn(JobsController, 'loadJobs');

        $httpBackend.expect('DELETE', '/api/v1/jobs/1');

        JobsController.deleteJob(jobId);
        $httpBackend.flush();

        expect(JobsController.loadJobs).toHaveBeenCalled();
      });
    });

    describe('restartJob()', function() {

      it('should make a PUT request to restart a job by its _id', function() {
        var jobId = '1';

        $httpBackend.expect('PUT', '/api/v1/jobs/1/restart');

        JobsController.restartJob(jobId);
        $httpBackend.flush();
      });
    });

    it('should go to jobCreation state when calls createJob()', function() {
      JobsController.createJob();
      $rootScope.$digest();

      expect($state.current.name).toBe('jobCreation');
    });

    it('should calculate total jobs count', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' },
        { _id: 3, lastState: 'success' }
      ];

      JobsController.totalJobs = 0;

      JobsController.calculateTotalJobs(jobs);

      expect(JobsController.totalJobs).toBe(3);
    });

    it('should calculate failure jobs count', function() {
      var jobs = [
        { _id: 1, lastState: 'success' },
        { _id: 2, lastState: 'failure' },
        { _id: 3, lastState: 'failure' }
      ];

      JobsController.failureJobs = 0;

      JobsController.calculateFailureJobs(jobs);

      expect(JobsController.totalJobs).toBe(2);
    });
  });

});
