'use strict';

describe('Controller: HomeController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var HomeController,
    $httpBackend,
    $rootScope,
    $scope,
    $state;

  var resolvedConfig = {
    "root_endpoint": "http://127.0.0.1:3000/"
  };

  beforeEach(inject(function($httpBackend, $templateCache) {
    $httpBackend.when('GET', '../config.json').respond(resolvedConfig);

    $templateCache.put('views/home.html', '');
    $templateCache.put('views/develop.html', '');
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');

    $scope = $rootScope.$new();

    HomeController = $controller('HomeController', {
      $scope: $scope,
      $state: $state
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should init HomeController correctly', function() {
    $httpBackend.flush();
    expect(HomeController).toBeDefined();
  });
});
