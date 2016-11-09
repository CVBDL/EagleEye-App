'use strict';

describe('UI router:', function() {
  var $state,
    $rootScope,
    $httpBackend,
    $location,
    $stateParams;

  // load main module
  beforeEach(module('eagleeye'));

  beforeEach(inject(function($httpBackend, $templateCache) {
    $templateCache.put('views/home.html', '');
    $templateCache.put('views/chart.html', '');
    $templateCache.put('views/charts.html', '');
    $templateCache.put('views/chart-creation.html', '');
    $templateCache.put('views/chart-settings.html', '');
    $templateCache.put('views/chart-sets.html', '');
    $templateCache.put('views/chart-set-creation.html', '');
    $templateCache.put('views/chart-set.html', '');
    $templateCache.put('views/chart-set-settings.html', '');
    $templateCache.put('views/develop.html', '');
  }));

  beforeEach(inject(function(_$httpBackend_, _$location_, _$rootScope_, _$state_, _$stateParams_) {
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should default to home state', function() {
    $location.path('/');
    $rootScope.$digest();

    expect($state.current.name).toBe('home');
    expect($location.url()).toBe('/home');
  });

  it('should have a home state', function() {
    $state.go('home');
    $rootScope.$digest();

    expect($state.current.name).toBe('home');
    expect($location.url()).toBe('/home');
  });

  it('should have a charts state', function() {
    $state.go('charts');
    $rootScope.$digest();

    expect($state.current.name).toBe('charts');
    expect($location.url()).toBe('/charts');
  });

  it('should have a chartCreation state', function() {
    $state.go('chartCreation');
    $rootScope.$digest();

    expect($state.current.name).toBe('chartCreation');
    expect($location.url()).toBe('/charts/new');
  });

  it('should have a chart state with a id parameter', function() {
    var chartId = 'foo';

    $state.go('chart', { id: chartId });
    $rootScope.$digest();

    expect($state.current.name).toBe('chart');
    expect($stateParams.id).toBe(chartId);
    expect($location.url()).toBe('/charts/' + chartId);
  });

  it('should have a chartSettings state with id parameter', function() {
    var chartId = 'foo';

    $state.go('chartSettings', { id: chartId });
    $rootScope.$digest();

    expect($state.current.name).toBe('chartSettings');
    expect($stateParams.id).toBe(chartId);
    expect($location.url()).toBe('/charts/' + chartId + '/settings');
  });

  it('should have a chartSets state', function() {
    $state.go('chartSets');
    $rootScope.$digest();

    expect($state.current.name).toBe('chartSets');
    expect($location.url()).toBe('/chart-sets');
  });

  it('should have a createChartSet state', function() {
    $state.go('chartSetCreation');
    $rootScope.$digest();

    expect($state.current.name).toBe('chartSetCreation');
    expect($location.url()).toBe('/chart-sets/new');
  });

  it('should have a chartSet state with id parameter', function() {
    var chartSetId = 'foo';

    $state.go('chartSet', { id: chartSetId });
    $rootScope.$digest();

    expect($state.current.name).toBe('chartSet');
    expect($stateParams.id).toBe(chartSetId);
    expect($location.url()).toBe('/chart-sets/' + chartSetId);
  });

  it('should have a chartSetSettings state with id parameter', function() {
    var chartSetId = 'foo';

    $state.go('chartSetSettings', { id: chartSetId });
    $rootScope.$digest();

    expect($state.current.name).toBe('chartSetSettings');
    expect($stateParams.id).toBe(chartSetId);
    expect($location.url()).toBe('/chart-sets/' + chartSetId + '/settings');
  });

  it('should have a develop state', function() {
    $state.go('develop');
    $rootScope.$digest();

    expect($state.current.name).toBe('develop');
    expect($location.url()).toBe('/develop');
  });
});


describe('Constant service', function() {
  var FEEDBACK_EMAIL;

  // load main module
  beforeEach(module('eagleeye'));

  beforeEach(inject(function(_FEEDBACK_EMAIL_) {
    FEEDBACK_EMAIL = _FEEDBACK_EMAIL_;
  }));

  it('should set correct FEEDBACK_EMAIL', function() {
    expect(FEEDBACK_EMAIL).toBeDefined();
    expect(FEEDBACK_EMAIL).not.toBe('');
  });
});
