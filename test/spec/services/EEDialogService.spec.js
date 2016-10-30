'use strict';

describe('Service: EEDialogService', function() {
  var $httpBackend,
    $mdDialog,
    $mdMedia,
    $q,
    $rootScope;


  var EEDialogService;

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

  beforeEach(inject(function (_$httpBackend_, _$mdDialog_, _$mdMedia_, _$q_, _$rootScope_, _EEDialogService_) {
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $mdMedia = _$mdMedia_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    EEDialogService = _EEDialogService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!EEDialogService).toBe(true);
  });

  describe('show()', function() {
    it('should calculate `useFullScreen` value', function() {
      EEDialogService.show({});
      expect($mdMedia).toHaveBeenCalled();
    });

    it('should call $mdDialog.show() to show a dialog', function() {
      EEDialogService.show({
        locals: {},
        controller: 'controller',
        templateUrl: 'templateUrl'
      });
      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: {},
        controller: 'controller',
        templateUrl: 'templateUrl',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.show({});

      expect(typeof expectedPromise.then).toBe('function');
    });
  });

  describe('showSharing()', function() {
    it('should call show() with custom locals', function() {
      spyOn(EEDialogService, 'show').and.callThrough();
      EEDialogService.showSharing({ foo: 'foo' });
      expect(EEDialogService.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: 'ShareDialogController as ctrl',
        templateUrl: 'scripts/templates/share.tmpl.html'
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.showSharing({});

      expect(typeof expectedPromise.then).toBe('function');
    });
  });

  describe('showChartCreationHelping()', function() {
    it('should call show() with custom locals', function() {
      spyOn(EEDialogService, 'show').and.callThrough();
      EEDialogService.showChartCreationHelping({ foo: 'foo' });
      expect(EEDialogService.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: jasmine.anything(),
        templateUrl: 'scripts/templates/chart-creation-help.tmpl.html'
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.showChartCreationHelping({});

      expect(typeof expectedPromise.then).toBe('function');
    });
  });

  describe('showDeleteConfirmation()', function() {
    beforeEach(function() {
      var promise = $q.defer().promise;

      spyOn($q, 'when').and.returnValue(promise);
      spyOn($q, 'reject').and.returnValue(promise);;
    });

    it('should call show() with custom locals', function() {
      spyOn(EEDialogService, 'show').and.callThrough();
      EEDialogService.showDeleteConfirmation({ foo: 'foo' });
      expect(EEDialogService.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: 'DeleteDialogController as ctrl',
        templateUrl: 'scripts/templates/delete.tmpl.html'
      });
    });

    it('should resolve the confirmation if response "delete"', function() {
      EEDialogService.showDeleteConfirmation({});
      $mdDialog.resolveShow('delete');
      $rootScope.$digest();
      expect($q.when).toHaveBeenCalledWith('delete');
      expect($q.reject).not.toHaveBeenCalled();
    });

    it('should reject the confirmation if response other than "delete"', function() {
      EEDialogService.showDeleteConfirmation({});
      $mdDialog.resolveShow('cancel');
      $rootScope.$digest();
      expect($q.when).not.toHaveBeenCalled();
      expect($q.reject).toHaveBeenCalledWith('cancel');
    });

    it('should return a promise if canceled delete', function() {
      var expectedPromise = EEDialogService.showDeleteConfirmation({});
      $mdDialog.resolveShow('cancel');
      $rootScope.$digest();
      expect(typeof expectedPromise.then).toBe('function');
    });

    it('should return a promise if canceled delete', function() {
      var expectedPromise = EEDialogService.showDeleteConfirmation({});
      $mdDialog.resolveShow('delete');
      $rootScope.$digest();
      expect(typeof expectedPromise.then).toBe('function');
    });
  });
});
