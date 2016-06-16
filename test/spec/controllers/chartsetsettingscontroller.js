'use strict';

describe('Controller: ChartsetsettingscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var ChartsetsettingscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartsetsettingscontrollerCtrl = $controller('ChartsetsettingscontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartsetsettingscontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
