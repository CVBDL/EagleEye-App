'use strict';

describe('Controller: ChartController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartController = $controller('ChartController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartController.awesomeThings.length).toBe(3);
  // });
});
