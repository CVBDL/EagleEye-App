'use strict';

describe('Controller: HomeController', function () {
  var $controller,
    $httpBackend,
    $rootScope,
    $scope,
    $state,
    HomeController;

  var resolvedConfig = {
    "root_endpoint": "http://127.0.0.1:3000/"
  };

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($httpBackend, $templateCache) {
    $httpBackend.when('GET', '../config.json').respond(resolvedConfig);

    $templateCache.put('views/home.html', '');
  }));

  beforeEach(inject(function ($injector) {
    $controller  = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope   = $injector.get('$rootScope');

    $scope = $rootScope.$new();
    HomeController = $controller('HomeController', { $scope: $scope });
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
