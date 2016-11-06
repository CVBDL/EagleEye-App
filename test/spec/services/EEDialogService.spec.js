'use strict';

describe('Service: EEDialogService', function() {
  var $httpBackend,
    $mdDialog,
    $mdMedia,
    $q,
    $rootScope;

  var EEDialogService;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {

    // mock $mdMedia
    $provide.factory('$mdMedia', function() {
      return jasmine.createSpy('$mdMedia').and.returnValue(true);
    });

    // mock $mdDialog
    $provide.factory('$mdDialog', function($q) {
      var qShow;

      var show = jasmine.createSpy('show').and.callFake(function() {
       qShow = $q.defer();

       return qShow.promise;
      });
      var hide = jasmine.createSpy('hide').and.callFake(function(value) {
        qShow.resolve(value);
      });
      var cancel = jasmine.createSpy('cancel').and.callFake(function(reason) {
        qShow.reject(reason);
      });

      return {
        show: show,
        hide: hide,
        cancel: cancel
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

    describe('returned promise', function() {
      var callbacks = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject'),
      };

      beforeEach(function() {
        EEDialogService.show({}).then(
          callbacks.resolve,
          callbacks.reject
        );
      });

      it('should be able to resove by $mdDialog.hide()', function() {
        expect(callbacks.resolve).not.toHaveBeenCalled();

        $mdDialog.hide('resolve');
        $rootScope.$digest();

        expect(callbacks.resolve).toHaveBeenCalledWith('resolve');
      });

      it('should be able to reject by $mdDialog.cancel()', function() {
        expect(callbacks.reject).not.toHaveBeenCalled();

        $mdDialog.cancel('reject');
        $rootScope.$digest();

        expect(callbacks.reject).toHaveBeenCalledWith('reject');
      });
    });
  });

  describe('showSharing()', function() {

    it('should call show() with custom locals', function() {
      EEDialogService.showSharing({ foo: 'foo' });

      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: 'ShareDialogController as ctrl',
        templateUrl: 'scripts/templates/share.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.showSharing({});

      expect(typeof expectedPromise.then).toBe('function');
    });

    describe('returned promise', function() {
      var callbacks = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject'),
      };

      beforeEach(function() {
        EEDialogService.showSharing({}).then(
          callbacks.resolve,
          callbacks.reject
        );
      });

      it('should be able to resove by $mdDialog.hide()', function() {
        expect(callbacks.resolve).not.toHaveBeenCalled();

        $mdDialog.hide('resolve');
        $rootScope.$digest();

        expect(callbacks.resolve).toHaveBeenCalledWith('resolve');
      });

      it('should be able to reject by $mdDialog.cancel()', function() {
        expect(callbacks.reject).not.toHaveBeenCalled();

        $mdDialog.cancel('reject');
        $rootScope.$digest();

        expect(callbacks.reject).toHaveBeenCalledWith('reject');
      });
    });
  });

  describe('showChartCreationHelping()', function() {

    it('should call show() with custom locals', function() {
      EEDialogService.showChartCreationHelping({ foo: 'foo' });

      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: jasmine.anything(),
        templateUrl: 'scripts/templates/chart-creation-help.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.showChartCreationHelping({});

      expect(typeof expectedPromise.then).toBe('function');
    });

    describe('returned promise', function() {
      var callbacks = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject'),
      };

      beforeEach(function() {
        EEDialogService.showChartCreationHelping({}).then(
          callbacks.resolve,
          callbacks.reject
        );
      });

      it('should be able to resove by $mdDialog.hide()', function() {
        expect(callbacks.resolve).not.toHaveBeenCalled();

        $mdDialog.hide('resolve');
        $rootScope.$digest();

        expect(callbacks.resolve).toHaveBeenCalledWith('resolve');
      });

      it('should be able to reject by $mdDialog.cancel()', function() {
        expect(callbacks.reject).not.toHaveBeenCalled();

        $mdDialog.cancel('reject');
        $rootScope.$digest();

        expect(callbacks.reject).toHaveBeenCalledWith('reject');
      });
    });
  });

  describe('showDeleteConfirmation()', function() {

    it('should call show() with custom locals', function() {
      EEDialogService.showDeleteConfirmation({ foo: 'foo' });

      expect($mdDialog.show).toHaveBeenCalledWith({
        locals: { foo: 'foo' },
        controller: 'DeleteDialogController as ctrl',
        templateUrl: 'scripts/templates/delete.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true
      });
    });

    it('should return a promise', function() {
      var expectedPromise = EEDialogService.showDeleteConfirmation({});

      expect(typeof expectedPromise.then).toBe('function');
    });

    describe('returned promise', function() {
      var callbacks = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject'),
      };

      beforeEach(function() {
        EEDialogService.showDeleteConfirmation({}).then(
          callbacks.resolve,
          callbacks.reject
        );
      });

      it('should be able to resove by $mdDialog.hide()', function() {
        expect(callbacks.resolve).not.toHaveBeenCalled();

        $mdDialog.hide('resolve');
        $rootScope.$digest();

        expect(callbacks.resolve).toHaveBeenCalledWith('resolve');
      });

      it('should be able to reject by $mdDialog.cancel()', function() {
        expect(callbacks.reject).not.toHaveBeenCalled();

        $mdDialog.cancel('reject');
        $rootScope.$digest();

        expect(callbacks.reject).toHaveBeenCalledWith('reject');
      });
    });
  });
});
