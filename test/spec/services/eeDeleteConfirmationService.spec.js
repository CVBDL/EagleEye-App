'use strict';

describe('Service: eeDeleteConfirmationService', function () {
  var $httpBackend,
    $mdDialog,
    $q,
    $rootScope;

  var eeDeleteConfirmationService;

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
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function (_$httpBackend_, _$mdDialog_, _$q_, _$rootScope_, _eeDeleteConfirmationService_) {
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    eeDeleteConfirmationService = _eeDeleteConfirmationService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!eeDeleteConfirmationService).toBe(true);
  });

  describe('showConfirmDialog()', function() {
    beforeEach(function() {
      spyOn($q, 'when');
      spyOn($q, 'reject');
    });

    it('should show confirmation dialog', function() {
      eeDeleteConfirmationService.showConfirmDialog({});
      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: {},
        controller: 'DeleteDialogController as ctrl',
        templateUrl: 'scripts/templates/delete.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should resolve the confirmation if response "delete"', function() {
      eeDeleteConfirmationService.showConfirmDialog({});
      $mdDialog.resolveShow('delete');
      $rootScope.$digest();
      expect($q.when).toHaveBeenCalledWith('delete');
      expect($q.reject).not.toHaveBeenCalled();
    });

    it('should reject the confirmation if response other than "delete"', function() {
      eeDeleteConfirmationService.showConfirmDialog({});
      $mdDialog.resolveShow('cancel');
      $rootScope.$digest();
      expect($q.when).not.toHaveBeenCalled();
      expect($q.reject).toHaveBeenCalledWith('cancel');
    });

    it('should do nothing if confirmation is rejected', function() {
      eeDeleteConfirmationService.showConfirmDialog({});
      $mdDialog.rejectShow('reject');
      $rootScope.$digest();
      expect($q.when).not.toHaveBeenCalled();
      expect($q.reject).not.toHaveBeenCalled();
    });
  });
});
