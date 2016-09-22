'use strict';

describe('Controller: ChartOptionsController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartOptionsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartOptionsController = $controller('ChartOptionsController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartOptionsController.awesomeThings.length).toBe(3);
  // });
});
