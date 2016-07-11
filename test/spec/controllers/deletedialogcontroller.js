'use strict';

describe('Controller: DeleteDialogController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var DeleteDialogController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteDialogController = $controller('DeleteDialogController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(DeleteDialogController.awesomeThings.length).toBe(3);
  // });
});
