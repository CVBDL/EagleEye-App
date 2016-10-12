'use strict';

describe('Controller: RootController', function() {
  var RootController;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($controller) {
    RootController = $controller('RootController', { });
  }));

  it('should initialize correctly', function() {
    expect(RootController).toBeDefined();
  });
});
