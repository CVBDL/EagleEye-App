'use strict';

describe('Controller: HomeController', function() {
  var HomeController;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($controller) {
    HomeController = $controller('HomeController', { });
  }));

  it('should initialize correctly', function() {
    expect(HomeController).toBeDefined();
  });
});
