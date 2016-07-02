'use strict';

describe('Controller: ChartSetController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartSetController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartSetController = $controller('ChartSetController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartSetController.awesomeThings.length).toBe(3);
  // });
});
