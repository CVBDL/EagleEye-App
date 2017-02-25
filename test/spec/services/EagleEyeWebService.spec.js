'use strict';

describe('Service: EagleEyeWebService', function() {
  var config,
    charts,
    chartsets;

  var $httpBackend,
    $rootScope;

  var EagleEyeWebService;

  // load main module
  beforeEach(module('eagleeye'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(
      _$httpBackend_, _$rootScope_, _EagleEyeWebService_) {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    config = {
      'root_endpoint': 'http://127.0.0.1:3000/'
    };

    charts = [{
      _id: 1,
      description: 'foo'
    }, {
      _id: 2,
      description: 'bar'
    }];

    chartsets = [{
      _id: 1,
      charts: []
    }, {
      _id: 2,
      charts: []
    }];
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!EagleEyeWebService).toBe(true);
  });

  describe('public apis', function() {

    beforeEach(function() {
      $httpBackend.when('GET', '../config.json').respond(config);
    });

    it('should be able to fetch charts with getCharts()', function() {
      var response;

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/charts').respond(charts);

      EagleEyeWebService.getCharts().then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(charts);
    });

    it('should be able to fetch chart by id with getChartById()', function() {
      var response;

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/charts/1').respond(charts[0]);

      $httpBackend.expect('GET', 'http://127.0.0.1:3000/api/v1/charts/1');

      EagleEyeWebService.getChartById('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(charts[0]);
    });

    it('should be able to create a new chart with createChart()', function() {
      var response;
      var newChart = {
        _id: 3,
        description: 'foobar'
      };

      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/charts').respond(newChart);

      $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/charts', {
        description: 'foobar'
      });

      EagleEyeWebService.createChart({
        description: 'foobar'
      }).then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(newChart);
    });

    it('should be able to edit a chart by id with updateChartById()', function() {
      var response;

      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/charts/1').respond({
        _id: 1,
        description: 'foobar'
      });

      $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/charts/1', {
        description: 'foobar'
      });

      EagleEyeWebService.updateChartById('1', {
        description: 'foobar'
      }).then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual({
        _id: 1,
        description: 'foobar'
      });
    });

    it('should be able to delete a chart by id with deleteChartById()', function() {
      var response = '';

      $httpBackend.when('DELETE', 'http://127.0.0.1:3000/api/v1/charts/1').respond(204);

      $httpBackend.expect('DELETE', 'http://127.0.0.1:3000/api/v1/charts/1');

      EagleEyeWebService.deleteChartById('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toBeUndefined();
    });

    it('should be able to fetch chart sets with getChartSets()', function() {
      var response;

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/chart-sets').respond(chartsets);

      EagleEyeWebService.getChartSets().then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(chartsets);
    });

    it('should be able to fetch chart set by id with getChartSetById()', function() {
      var response;

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/chart-sets/1').respond(chartsets[0]);

      $httpBackend.expect('GET', 'http://127.0.0.1:3000/api/v1/chart-sets/1');

      EagleEyeWebService.getChartSetById('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(chartsets[0]);
    });

    it('should be able to create a new chart set with createChartSet()', function() {
      var response;
      var newChartSet = {
        _id: 3,
        charts: ['foo']
      };

      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/chart-sets').respond(newChartSet);

      $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/chart-sets', {
        charts: ['foo']
      });

      EagleEyeWebService.createChartSet({
        charts: ['foo']
      }).then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual(newChartSet);
    });

    it('should be able to edit a chart set by id with updateChartSetById()', function() {
      var response;

      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/chart-sets/1').respond({
        _id: 1,
        charts: ['foo']
      });

      $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/chart-sets/1', {
        charts: ['foo']
      });

      EagleEyeWebService.updateChartSetById('1', {
        charts: ['foo']
      }).then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual({
        _id: 1,
        charts: ['foo']
      });
    });

    it('should be able to delete a chart set by id with deleteChartSetById()', function() {
      var response = '';

      $httpBackend.when('DELETE', 'http://127.0.0.1:3000/api/v1/chart-sets/1').respond(204);

      $httpBackend.expect('DELETE', 'http://127.0.0.1:3000/api/v1/chart-sets/1');

      EagleEyeWebService.deleteChartSetById('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toBeUndefined();
    });

    it('should be able to fetch jobs with getJobs()', function() {
      var response = '';

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/jobs').respond([{
        foo: 'foo'
      }]);

      $httpBackend.expect('GET', 'http://127.0.0.1:3000/api/v1/jobs');

      EagleEyeWebService.getJobs().then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual([{
        foo: 'foo'
      }]);
    });

    it('should be able to fetch single job with getJob(jobId)', function() {
      var response = '';

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/jobs/1').respond({
        foo: 'foo'
      });

      $httpBackend.expect('GET', 'http://127.0.0.1:3000/api/v1/jobs/1');

      EagleEyeWebService.getJob('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual({
        foo: 'foo'
      });
    });

    it('should be able to create a job with createJob()', function() {
      var response = '';

      $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/jobs').respond({
        foo: 'foo'
      });

      $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/jobs');

      EagleEyeWebService.createJob({}).then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual({
        foo: 'foo'
      });
    });

    it('should be able to delete a job with deleteJob()', function() {
      var response = '';

      $httpBackend.when('DELETE', 'http://127.0.0.1:3000/api/v1/jobs/1').respond(204);

      $httpBackend.expect('DELETE', 'http://127.0.0.1:3000/api/v1/jobs/1');

      EagleEyeWebService.deleteJob('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toBeUndefined();
    });

    it('should be able to restart a job with restartJob()', function() {
      var response = '';

      $httpBackend.when('PUT', 'http://127.0.0.1:3000/api/v1/jobs/1/restart').respond(204);

      $httpBackend.expect('PUT', 'http://127.0.0.1:3000/api/v1/jobs/1/restart');

      EagleEyeWebService.restartJob('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toBeUndefined();
    });

    it('should be able to fetch tasks with getTasks()', function() {
      var response = '';

      $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/jobs/1/tasks').respond([{
        foo: 'foo'
      }]);

      $httpBackend.expect('GET', 'http://127.0.0.1:3000/api/v1/jobs/1/tasks');

      EagleEyeWebService.getTasks('1').then(function(res) {
        response = res;
      });
      $httpBackend.flush();

      expect(response).toEqual([{
        foo: 'foo'
      }]);
    });
  });

  describe('private apis', function() {

    it('should initialize `_rootEndpoint` to empty string', function() {
      expect(EagleEyeWebService._rootEndpoint).toBe('');
    });

    describe('getRootEndpoint()', function() {

      it('should resolve with exist `_rootEndpoint` without fetching config.json', function() {
        var response;

        EagleEyeWebService._rootEndpoint = 'http://127.0.0.1:3000/';

        EagleEyeWebService.getRootEndpoint().then(function(res) {
          response = res;
        });
        $rootScope.$digest();

        expect(response).toBe('http://127.0.0.1:3000/');
      });

      it('should fetch config.json and resolve with `root_endpoint` field if `_rootEndpoint` is not set', function() {
        var response;

        $httpBackend.when('GET', '../config.json').respond(config);

        EagleEyeWebService._rootEndpoint = '';

        $httpBackend.expect('GET', '../config.json');

        EagleEyeWebService.getRootEndpoint().then(function(res) {
          response = res;
        });
        $httpBackend.flush();

        expect(response).toBe('http://127.0.0.1:3000/');
      });
    });

    describe('fetchServer()', function() {

      beforeEach(function() {
        $httpBackend.when('GET', '../config.json').respond(config);
        $httpBackend.when('POST', 'http://127.0.0.1:3000/api/v1/charts/1').respond('');
      });

      it('should make request with provided options', function() {
        var response;

        $httpBackend.expect('POST', 'http://127.0.0.1:3000/api/v1/charts/1', {
          description: 'foo'
        });

        EagleEyeWebService.fetchServer({
          method: 'POST',
          url: 'charts/1',
          data: { description: 'foo' }
        }).then(function(res) {
          response = res;
        });
        $httpBackend.flush();

        expect(response).toBe('');
      });
    });
  });
});
