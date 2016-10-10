'use strict';

describe('Controller: AppController', function () {
  var $controller,
    $rootScope,
    $scope,
    AppController,
    FEEDBACK_EMAIL;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function ($injector) {
    $controller    = $injector.get('$controller');
    $rootScope     = $injector.get('$rootScope');
    FEEDBACK_EMAIL = $injector.get('FEEDBACK_EMAIL');

    $scope = $rootScope.$new();
    AppController = $controller('AppController', {
      $scope: $scope,
      FEEDBACK_EMAIL: FEEDBACK_EMAIL
    });
  }));

  it('should init AppController correctly', function() {
    expect(AppController).toBeDefined();
  });

  it('should set correct feedback link', function () {
    expect($scope.feedbackLink).toBe("mailto:"+ FEEDBACK_EMAIL + "?subject=EagleEye+Feedback");
  });
});
