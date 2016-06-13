'use strict';

describe('Controller: ChartcreationcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var ChartcreationcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartcreationcontrollerCtrl = $controller('ChartcreationcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartcreationcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
