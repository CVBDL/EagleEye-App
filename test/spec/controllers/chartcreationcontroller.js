'use strict';

describe('Controller: ChartCreationController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartCreationController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartCreationController = $controller('ChartCreationController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartCreationController.awesomeThings.length).toBe(3);
  // });
});
