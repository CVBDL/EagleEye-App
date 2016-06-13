'use strict';

describe('Controller: DashboardcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var DashboardcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardcontrollerCtrl = $controller('DashboardcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashboardcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
