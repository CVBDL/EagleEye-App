'use strict';

describe('Directive: eeFriendlyUrlValidator', function() {
  var $compile,
    $rootScope,
    $httpBackend,
    ngModel;

  var $scope,
    getChartRequestHandler,
    getChartSetRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function() {
    var config = {
      "root_endpoint": "http://127.0.0.1:3000/"
    };

    $httpBackend.when('GET', '../config.json').respond(config);
    getChartRequestHandler = $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/charts/c-bar-chart').respond('');
    getChartSetRequestHandler = $httpBackend.when('GET', 'http://127.0.0.1:3000/api/v1/chart-sets/s-chart-set-one').respond('');
  });

  beforeEach(inject(function($rootScope) {
    $scope = $rootScope.$new();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function directiveElementFactory(type) {
    var element;

    element = angular.element(
      '<form name="form">' +
        '<input name="friendlyUrl" ee-friendly-url-validator="' + type + '" ng-model="friendlyUrl">' +
      '</form>'
    );
    element = $compile(element)($scope);

    return element;
  }

  function isFriendlyUrlCheckingValid() {
    return !!!$scope.form.friendlyUrl.$error.friendlyUrlChecking;
  }

  function isFriendlyUrlAvailableValid() {
    return !!!$scope.form.friendlyUrl.$error.friendlyUrlAvailable;
  }

  describe('chart', function() {

    it('should initialize friendlyUrl validity state', function() {
      var element = directiveElementFactory('chart');

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(true);
    });

    it('should set `friendlyUrlChecking` to false and `friendlyUrlAvailable` to true before checking on server', function() {
      var element = directiveElementFactory('chart');

      $scope.form.friendlyUrl.$setViewValue('bar-chart');
      $rootScope.$digest();

      expect(isFriendlyUrlCheckingValid()).toBe(false);
      expect(isFriendlyUrlAvailableValid()).toBe(true);

      getChartRequestHandler.respond({});
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(false);
    });

    it('should set `friendlyUrlChecking` to true and `friendlyUrlAvailable` to false if friendlyUrl already exist', function() {
      var element = directiveElementFactory('chart');

      $scope.form.friendlyUrl.$setViewValue('bar-chart');
      $rootScope.$digest();

      getChartRequestHandler.respond({});
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(false);
    });

    it('should set `friendlyUrlChecking` to true and `friendlyUrlAvailable` to true if friendlyUrl not exist', function() {
      var element = directiveElementFactory('chart');

      $scope.form.friendlyUrl.$setViewValue('bar-chart');
      $rootScope.$digest();

      getChartRequestHandler.respond(500);
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(true);
    });
  });

  describe('chart set', function() {

    it('should initialize friendlyUrl validity state', function() {
      var element = directiveElementFactory('chartset');

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(true);
    });

    it('should set `friendlyUrlChecking` to false and `friendlyUrlAvailable` to true before checking on server', function() {
      var element = directiveElementFactory('chartset');

      $scope.form.friendlyUrl.$setViewValue('chart-set-one');
      $rootScope.$digest();

      expect(isFriendlyUrlCheckingValid()).toBe(false);
      expect(isFriendlyUrlAvailableValid()).toBe(true);

      getChartSetRequestHandler.respond({});
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(false);
    });

    it('should set `friendlyUrlChecking` to true and `friendlyUrlAvailable` to false if friendlyUrl already exist', function() {
      var element = directiveElementFactory('chartset');

      $scope.form.friendlyUrl.$setViewValue('chart-set-one');
      $rootScope.$digest();

      getChartSetRequestHandler.respond({});
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(false);
    });

    it('should set `friendlyUrlChecking` to true and `friendlyUrlAvailable` to true if friendlyUrl not exist', function() {
      var element = directiveElementFactory('chartset');

      $scope.form.friendlyUrl.$setViewValue('chart-set-one');
      $rootScope.$digest();

      getChartSetRequestHandler.respond(500);
      $httpBackend.flush();

      expect(isFriendlyUrlCheckingValid()).toBe(true);
      expect(isFriendlyUrlAvailableValid()).toBe(true);
    });
  });
});
