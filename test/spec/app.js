'use strict';

describe('Main app.js', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));
  beforeEach(module('ngMock'));

  var $injector,
    $state,
    $rootScope,
    $httpBackend,
    $templateCache,
    $location,
    $stateParams,
    configRequestHandler,
    configJSON = {
      "root_endpoint": "http://127.0.0.1:3000/"
    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$injector_, _$state_, _$rootScope_, _$httpBackend_, _$templateCache_) {
    $injector = _$injector_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $templateCache = _$templateCache_;
    $location = $injector.get('$location');
    $stateParams = $injector.get('$stateParams');


    configRequestHandler = $httpBackend.when('GET', '../config.json').respond(configJSON);

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

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should request config.json when access root state', function() {
    $httpBackend.expect('GET', '../config.json');
    $httpBackend.flush();
  });

  it('should default to home state', function() {
    var notExistPath = '#/not-exist-url';
    var stateName = 'home';

    $location.path(notExistPath);
    $httpBackend.flush();

    expect($state.current.name).toBe(stateName);
  });

  it('should resolve with correct config data', function() {
    var configPromise = $injector.invoke($state.get('root').resolve.config);

    $httpBackend.flush();

    configPromise.then(function(data) {
      expect(data.data).toEqual(configJSON);
    });
  });

  it('should go to home state', function() {
    var stateName = 'home';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

  it('should go to charts state', function() {
    var stateName = 'charts';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

  it('should go to create chart state', function() {
    var stateName = 'createChart';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

  it('should go to chart state', function() {
    var stateName = 'chart',
      stateOptions = {
        id: 'the-id'
      };

    $httpBackend.flush();
    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
  });

  it('should go to chartSettings state', function() {
    var stateName = 'chartSettings',
      stateOptions = {
        id: 'the-id'
      };

    $httpBackend.flush();
    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/charts/the-id/settings');
  });

  it('should go to chartSets state', function() {
    var stateName = 'chartSets';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

  it('should go to createChartSet state', function() {
    var stateName = 'createChartSet';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

  it('should go to chartSet state', function() {
    var stateName = 'chartSet',
      stateOptions = {
        id: 'the-id'
      };

    $httpBackend.flush();
    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/chart-sets/the-id');
  });

  it('should go to chartSetSettings state', function() {
    var stateName = 'chartSetSettings',
      stateOptions = {
        id: 'the-id'
      };

    $httpBackend.flush();
    $state.go(stateName, stateOptions);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
    expect($stateParams.id).toBe(stateOptions.id);
    expect($location.url()).toBe('/chart-sets/the-id/settings');
  });

  it('should go to develop state', function() {
    var stateName = 'develop';

    $httpBackend.flush();
    $state.go(stateName);
    $rootScope.$digest();

    expect($state.current.name).toBe(stateName);
  });

});
