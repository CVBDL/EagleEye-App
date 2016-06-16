'use strict';

describe('Controller: ChartsetcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var ChartsetcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartsetcontrollerCtrl = $controller('ChartsetcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartsetcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
