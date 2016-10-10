'use strict';

describe('Controller: ChartsController', function () {
  var $controller,
    $rootScope,
    $scope,
    $state,
    ChartsController,
    EagleEyeWebService,
    eeDeleteConfirmationService;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    EagleEyeWebService = $injector.get('EagleEyeWebService');
    eeDeleteConfirmationService = $injector.get('eeDeleteConfirmationService');

    $scope = $rootScope.$new();
    ChartsController = $controller('ChartsController', {
      $scope: $scope,
      EagleEyeWebService: EagleEyeWebService,
      eeDeleteConfirmationService: eeDeleteConfirmationService
    });
  }));

  it('should init ChartsController correctly', function () {
    expect(ChartsController).toBeDefined();
  });
});
