'use strict';

describe('Controller: ChartSetsController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartSetsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartSetsController = $controller('ChartSetsController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartSetsController.awesomeThings.length).toBe(3);
  // });
});
