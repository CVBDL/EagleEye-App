'use strict';

describe('Controller: ChartSetsController', function () {
  var $controller,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    EagleEyeWebService,
    eeDeleteConfirmationService;

  var ChartSetsController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('eeDeleteConfirmationService', function($q) {
      var qShowConfirmDialog;

      var showConfirmDialog = jasmine.createSpy('showConfirmDialog').and.callFake(function(config) {
        qShowConfirmDialog = $q.defer();

        return qShowConfirmDialog.promise;
      });

      return {
        showConfirmDialog: showConfirmDialog,
        resolveShowConfirmDialog: function(value) { qShowConfirmDialog.resolve(value); },
        rejectShowConfirmDialog: function(reason) { qShowConfirmDialog.reject(reason); }
      };
    });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$state_, _$httpBackend_, _EagleEyeWebService_, _eeDeleteConfirmationService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    eeDeleteConfirmationService = _eeDeleteConfirmationService_;
  }));

  beforeEach(inject(function() {
    ChartSetsController = $controller('ChartSetsController', {
      $state: $state,
      EagleEyeWebService: EagleEyeWebService,
      eeDeleteConfirmationService: eeDeleteConfirmationService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSetsController).toBeDefined();
  });

  it('should set default isLoading model', function() {
    expect(ChartSetsController.isLoading).toBe(true);
  });

  it('should call init() to initialize controller', function() {
    expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
    EagleEyeWebService.resolveGetChartSets([]);
    $rootScope.$digest();
    expect(ChartSetsController.isLoading).toBe(false);
    expect(ChartSetsController.chartSetList).toEqual([]);
  });

  describe('init()', function() {
    it('should call loadChartSetList() to fetch chart sets', function() {
      ChartSetsController.init();
      expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
    });
  });

  describe('loadChartSetList()', function() {
    it('should call EagleEyeWebService service to fetch chart sets from server', function() {
      ChartSetsController.loadChartSetList();
      expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
    });

    it('should set isLoading to false and refresh chartList after fetching charts', function() {
      ChartSetsController.loadChartSetList();
      expect(EagleEyeWebService.getChartSets).toHaveBeenCalled();
      EagleEyeWebService.resolveGetChartSets([]);
      $rootScope.$digest();
      expect(ChartSetsController.isLoading).toBe(false);
      expect(ChartSetsController.chartSetList).toEqual([]);
    });
  });

  describe('onClickDeleteChartSet()', function() {
    var $event,
      chartset;

    beforeEach(function() {
      spyOn(ChartSetsController, 'loadChartSetList');

      $event = {
        stopPropagation: jasmine.createSpy('stopPropagation')
      };

      chartset = {
        _id: 'id',
        title: 'title'
      }
    });

    it('should stop default event propagation', function() {
      ChartSetsController.onClickDeleteChartSet($event, chartset);
      expect($event.stopPropagation).toHaveBeenCalled();
    });

    it('should show confirm dialog before delete', function() {
      ChartSetsController.onClickDeleteChartSet($event, chartset);
      expect(eeDeleteConfirmationService.showConfirmDialog).toHaveBeenCalledWith({ title: 'title' });
    });

    it('should cancel delete if user click cancel', function() {
      ChartSetsController.onClickDeleteChartSet($event, chartset);
      eeDeleteConfirmationService.rejectShowConfirmDialog();
      $rootScope.$digest();
      expect(EagleEyeWebService.deleteChartSetById).not.toHaveBeenCalled();
      expect(ChartSetsController.loadChartSetList).not.toHaveBeenCalled();
    });

    it('should delete the chart if user click ok', function() {
      ChartSetsController.onClickDeleteChartSet($event, chartset);
      eeDeleteConfirmationService.resolveShowConfirmDialog();
      $rootScope.$digest();
      expect(EagleEyeWebService.deleteChartSetById).toHaveBeenCalledWith('id');
    });

    it('should refresh chart list after delete a chart', function() {
      ChartSetsController.onClickDeleteChartSet($event, chartset);
      eeDeleteConfirmationService.resolveShowConfirmDialog();
      $rootScope.$digest();
      EagleEyeWebService.resolveDeleteChartSetById();
      $rootScope.$digest();
      expect(ChartSetsController.loadChartSetList).toHaveBeenCalled();
    });
  });

  describe('createChartSet()', function() {
    it('should go to chartSetCreation state', function() {
      spyOn($state, 'go');

      ChartSetsController.createChartSet();
      expect($state.go).toHaveBeenCalledWith('chartSetCreation');
    });
  });
});
