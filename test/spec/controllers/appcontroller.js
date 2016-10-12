'use strict';

describe('Controller: AppController', function () {
  var $controller,
    $rootScope,
    AppController,
    FEEDBACK_EMAIL;

  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.constant('FEEDBACK_EMAIL', 'example@example.com');
  }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _FEEDBACK_EMAIL_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    FEEDBACK_EMAIL = _FEEDBACK_EMAIL_;
  }));

  beforeEach(function() {
    AppController = $controller('AppController', {
      $scope: $rootScope.$new(),
      FEEDBACK_EMAIL: FEEDBACK_EMAIL
    });
  })

  it('should init AppController correctly', function() {
    expect(AppController).toBeDefined();
  });

  it('should set correct feedback link', function () {
    expect(AppController.feedbackLink).toBe("mailto:example@example.com?subject=EagleEye+Feedback");
  });
});
