'use strict';

describe('Controller: AppController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var AppController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppController = $controller('AppController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(AppController.awesomeThings.length).toBe(3);
  // });
});
