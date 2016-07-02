'use strict';

describe('Controller: ChartSettingsController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var ChartSettingsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartSettingsController = $controller('ChartSettingsController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(ChartSettingsController.awesomeThings.length).toBe(3);
  // });
});
