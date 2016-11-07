'use strict';

describe('Controller: ShareDialogController', function() {
  var $controller,
    $httpBackend,
    $mdDialog,
    sharedTitle,
    sharedLink;

  var ShareDialogController;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$mdDialog', function() {
      return {
        cancel: jasmine.createSpy('cancel')
      };
    });

    $provide.value('sharedTitle', 'title');
    $provide.value('sharedLink', 'http://example.com');
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$mdDialog_, _sharedTitle_, _sharedLink_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    sharedTitle = _sharedTitle_;
    sharedLink = _sharedLink_;
  }));

  beforeEach(inject(function ($controller) {
    ShareDialogController = $controller('ShareDialogController', {
      $mdDialog: $mdDialog,
      sharedTitle: sharedTitle,
      sharedLink: sharedLink
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ShareDialogController).toBeDefined();
  });

  it('should set mailTemplate model', function() {
    var link = 'mailto:?subject=Share: title&body=http://example.com%0d Shared from EagleEye';

    expect(ShareDialogController.mailTemplate).toBe(link);
  });

  it('should be able to cancel the delete action', function() {
    ShareDialogController.cancel();

    expect($mdDialog.cancel).toHaveBeenCalled();
  });
});
