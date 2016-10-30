'use strict';

describe('Service: ShareService', function () {
  var $httpBackend,
    $mdDialog,
    $q,
    $rootScope;

  var ShareService;

  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.factory('$mdMedia', function() {
      return jasmine.createSpy('$mdMedia').and.callFake(function() {
        return true;
      });
    });

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
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$httpBackend_, _$mdDialog_, _$q_, _$rootScope_, _ShareService_) {
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    ShareService = _ShareService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!ShareService).toBe(true);
  });

  it('should show confirmation dialog', function() {
    ShareService.showShareDialog({});
    expect($mdDialog.show).toHaveBeenCalledWith({
      locals: {},
      controller: 'ShareDialogController as ctrl',
      templateUrl: 'scripts/templates/share.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: true
    });
  });
});
