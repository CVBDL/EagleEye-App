'use strict';

describe('Controller: DevelopController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var DevelopController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DevelopController = $controller('DevelopController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
