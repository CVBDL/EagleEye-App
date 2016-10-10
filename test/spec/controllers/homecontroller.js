'use strict';

describe('Controller: HomeController', function() {
  var HomeController;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($httpBackend, $templateCache) {
    $templateCache.put('views/home.html', '');
  }));

  beforeEach(inject(function($controller) {
    HomeController = $controller('HomeController', { });
  }));

  it('should init HomeController correctly', function() {
    expect(HomeController).toBeDefined();
  });
});
