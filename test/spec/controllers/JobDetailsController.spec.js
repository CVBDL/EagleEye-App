'use strict';

describe('Controller: JobDetailsController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $templateCache,
    EagleEyeWebService;

  var JobDetailsController;

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
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$templateCache_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_,
    $state = _$state_;
    $templateCache = _$templateCache_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    $httpBackend.when('POST', '/api/v1/jobs').respond({ _id: '1' });
  });

  beforeEach(function() {
    $templateCache.put('views/jobs.html', '');
  });

  beforeEach(inject(function() {
    JobDetailsController = $controller('JobDetailsController', {
      $state: $state,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(JobDetailsController).toBeDefined();
  });

  describe('on initialize', function() {

    it('should initialize job model', function() {
      expect(typeof JobDetailsController.job).toBe('object');
      expect(JobDetailsController.job).not.toBeNull();
    });

    it('should initialize expressionOptions model', function() {
      expect(JobDetailsController.expressionOptions).toEqual([{
        label: 'Use Custom Expression',
        value: 'custom'
      }, {
        label: 'Hourly',
        value: '0 * * * *'
      }, {
        label: 'Daily',
        value: '0 0 * * *'
      }, {
        label: 'Weekly',
        value: '0 0 * * 0'
      }, {
        label: 'Monthly',
        value: '0 0 1 * *'
      }, {
        label: 'Yearly',
        value: '0 0 1 1 *'
      }]);
    });
  });

  describe('on bootstrap', function() { });

  describe('on runtime', function() {

    describe('getExpression()', function() {

      it('should return predefined expression if `job.expression` is not "cumtom"', function() {
        var job = {
          expression: '0 0 * * *',
          customExpression: {
            minute: '1',
            hour: '1',
            dayOfMonth: '1',
            month: '1',
            dayOfWeek: '1'
          }
        };

        expect(JobDetailsController.getExpression(job)).toBe('0 0 * * *');
      });

      it('should return custom expression if `job.expression` is "custom"', function() {
        var job = {
          expression: 'custom',
          customExpression: {
            minute: '1',
            hour: '1',
            dayOfMonth: '1',
            month: '1',
            dayOfWeek: '1'
          }
        };

        expect(JobDetailsController.getExpression(job)).toBe('1 1 1 1 1');
      });
    });

    describe('makeJobPayload()', function() {

      it('should make job payload', function() {
        var job = {
          name: 'The name',
          command: 'example.sh',
          enabled: true,
          expression: '0 0 * * *',
          customExpression: {
            minute: '1',
            hour: '1',
            dayOfMonth: '1',
            month: '1',
            dayOfWeek: '1'
          }
        };

        expect(JobDetailsController.makeJobPayload(job)).toEqual({
          name: 'The name',
          command: 'example.sh',
          enabled: true,
          expression: '0 0 * * *'
        });
      });

      it('should make job payload', function() {
        var job = {
          name: 'The name',
          command: 'example.sh',
          enabled: true,
          expression: 'custom',
          customExpression: {
            minute: '1',
            hour: '1',
            dayOfMonth: '1',
            month: '1',
            dayOfWeek: '1'
          }
        };

        expect(JobDetailsController.makeJobPayload(job)).toEqual({
          name: 'The name',
          command: 'example.sh',
          enabled: true,
          expression: '1 1 1 1 1'
        });
      });
    });

    describe('save()', function() {

      it('should make a  POST request to create a job', function() {
        var job = {
          name: 'The name',
          command: 'example.sh',
          enabled: true,
          expression: '0 0 * * *'
        };

        $httpBackend.expect('POST', '/api/v1/jobs', job);

        JobDetailsController.save(job);
        $httpBackend.flush();

        expect($state.current.name).toBe('jobs');
      });
    });
  });

});
