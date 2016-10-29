'use strict';

describe('Service: eeHelpDialogService', function () {
  var $httpBackend,
    $mdDialog;

  var eeHelpDialogService;

  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.factory('$mdDialog', function($q) {
      var qShow;

      var show = jasmine.createSpy('show').and.callFake(function() {
        qShow = $q.defer();

        return qShow.promise;
      });

      return {
        show: show,
        resolveShow: function(value) { qShow.resolve(value); },
        rejectShow: function(reason) { qShow.reject(reason); }
      };
    });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$httpBackend_, _$mdDialog_, _eeHelpDialogService_) {
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    eeHelpDialogService = _eeHelpDialogService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!eeHelpDialogService).toBe(true);
  });

  it('should show help dialog', function() {
    eeHelpDialogService.showHelp();
    expect($mdDialog.show).toHaveBeenCalled();
  });
});
