'use strict';

describe('Controller: ChartSetCreationController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartSetCreationController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartSetCreationController = $controller('ChartSetCreationController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartSetCreationController.awesomeThings.length).toBe(3);
  // });
});
