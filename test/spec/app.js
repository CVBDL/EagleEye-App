'use strict';

describe('app.js', function() {
  var chartId = '57837029c66dc1a4570962b6';
  var chartSetId = '578c8c493164a7304f72a9f3';

  var $injector,
    $state,
    $rootScope,
    $httpBackend,
    $templateCache,
    $location,
    $stateParams;

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

  beforeEach(inject(function(_$injector_, _$httpBackend_, _$location_, _$rootScope_, _$state_, _$stateParams_) {
    $injector = _$injector_;
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
    var notExistPath = '#/not-exist-url';
    var stateName = 'home';
    var url = '/home';

    $location.path(notExistPath);

    $rootScope.$digest();
    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to home state', function() {
    var stateName = 'home';
    var url = '/home';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to charts state', function() {
    var stateName = 'charts';
    var url = '/charts';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to create chart state', function() {
    var stateName = 'chartCreation';
    var url = '/charts/new';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to chart state', function() {
    var stateName = 'chart';
    var url = '/charts/';
    var stateOptions = {
      id: chartId
    };

    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe(url + chartId);
  });

  it('should go to chartSettings state', function() {
    var stateName = 'chartSettings';
    var stateOptions = {
      id: chartId
    };

    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/charts/' + chartId + '/settings');
  });

  it('should go to chartSets state', function() {
    var stateName = 'chartSets';
    var url = '/chart-sets';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to createChartSet state', function() {
    var stateName = 'chartSetCreation';
    var url = '/chart-sets/new';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

  it('should go to chartSet state', function() {
    var stateName = 'chartSet';
    var stateOptions = {
      id: chartSetId
    };

    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/chart-sets/' + chartSetId);
  });

  it('should go to chartSetSettings state', function() {
    var stateName = 'chartSetSettings';
    var stateOptions = {
      id: chartSetId
    };

    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/chart-sets/' + chartSetId + '/settings');
  });

  it('should go to develop state', function() {
    var stateName = 'develop';
    var url = '/develop';

    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($location.url()).toBe(url);
  });

});
