'use strict';

describe('Controller: AppController', function () {

  // load the controller's module
  beforeEach(module('eagleeye'));

  var AppController,
    $scope,
    FEEDBACK_EMAIL;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _FEEDBACK_EMAIL_) {
    $scope = $rootScope.$new();
    FEEDBACK_EMAIL = _FEEDBACK_EMAIL_;
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
