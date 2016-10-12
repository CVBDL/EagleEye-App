'use strict';

describe('Controller: DevelopController', function() {
  var DevelopController;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function($controller) {
    DevelopController = $controller('DevelopController', { });
  }));

  it('should initialize correctly', function() {
    expect(DevelopController).toBeDefined();
  });
});
