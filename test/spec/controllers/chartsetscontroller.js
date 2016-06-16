'use strict';

describe('Controller: ChartsetscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var ChartsetscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartsetscontrollerCtrl = $controller('ChartsetscontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartsetscontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
