'use strict';

describe('Controller: ChartscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('eagleEyeApp'));

  var ChartscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartscontrollerCtrl = $controller('ChartscontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChartscontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
