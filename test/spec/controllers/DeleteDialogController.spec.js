'use strict';

describe('Controller: DeleteDialogController', function() {
  var $controller,
    $httpBackend,
    $mdDialog,
    title;

  var DeleteDialogController;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$mdDialog', function() {
      return {
        cancel: jasmine.createSpy('cancel'),
        hide: jasmine.createSpy('hide')
      };
    });

    $provide.value('title', 'title');
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$mdDialog_, _title_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    title = _title_;
  }));

  beforeEach(inject(function() {
    DeleteDialogController = $controller('DeleteDialogController', {
      $mdDialog: $mdDialog,
      title: title
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(DeleteDialogController).toBeDefined();
  });

  it('should set title model', function() {
    expect(DeleteDialogController.title).toBe('title');
  });

  it('should be able to cancel the delete action', function() {
    DeleteDialogController.cancel();

    expect($mdDialog.cancel).toHaveBeenCalled();
  });

  it('should be able to do the delete action', function() {
    DeleteDialogController.delete();

    expect($mdDialog.hide).toHaveBeenCalled();
  });
});
