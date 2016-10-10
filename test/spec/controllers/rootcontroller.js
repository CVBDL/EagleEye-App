'use strict';

describe('Controller: RootController', function() {
  var RootController;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($controller, $rootScope) {
    RootController = $controller('RootController', { });
  }));

  it('should init RootController correctly', function() {
    expect(RootController).toBeDefined();
  });
});
