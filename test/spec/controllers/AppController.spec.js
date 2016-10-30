'use strict';

describe('Controller: AppController', function () {
  var $controller,
    $httpBackend,
    FEEDBACK_EMAIL;

  var AppController;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.constant('FEEDBACK_EMAIL', 'example@example.com');
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$controller_, _$httpBackend_, _FEEDBACK_EMAIL_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    FEEDBACK_EMAIL = _FEEDBACK_EMAIL_;
  }));

  beforeEach(function() {
    AppController = $controller('AppController', {
      FEEDBACK_EMAIL: FEEDBACK_EMAIL
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(AppController).toBeDefined();
  });

  it('should set `feedbackLink` model', function () {
    var feedbackLink = 'mailto:example@example.com?subject=EagleEye+Feedback';

    expect(AppController.feedbackLink).toBe(feedbackLink);
  });
});
