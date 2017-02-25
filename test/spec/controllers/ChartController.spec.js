'use strict';

describe('Controller: ChartController', function() {
  var $controller,
    $httpBackend,
    $interval,
    $location,
    $mdDialog,
    $rootScope,
    $stateParams,
    EagleEyeWebService,
    EEDialogService;

  var ChartController,
    getChartByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load ngMaterial mock module
  beforeEach(module('ngMaterialMock'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: '1' };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(
      _$controller_, _$mdDialog_, _$rootScope_, _$stateParams_, _$httpBackend_,
      _$location_, _$interval_, _EagleEyeWebService_, _EEDialogService_) {

    $controller = _$controller_;
    $mdDialog = _$mdDialog_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    EEDialogService = _EEDialogService_;
  }));

  beforeEach(function() {
    getChartByIdRequestHandler =
      $httpBackend.when('GET', '/api/v1/charts/1').respond({});
  });

  beforeEach(function() {
    ChartController = $controller('ChartController', {
      $stateParams: $stateParams,
      $location: $location,
      $interval: $interval,
      EagleEyeWebService: EagleEyeWebService,
      EEDialogService: EEDialogService
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartController.id).toBe('1');
    });

    it('should initialize `DELAY` model to one minute', function() {
      expect(ChartController.DELAY).toBe(60 * 1000);
    });

    it('should initialize `isAutoReloadSwitchOn` model to false', function() {
      expect(ChartController.isAutoReloadSwitchOn).toBe(false);
    });

    it('should initialize `autoReloadChartPromise` model to null', function() {
      expect(ChartController.autoReloadChartPromise).toBeNull();
    });

    it('should initialize `chart` model', function() {
      expect(ChartController.chart).not.toBeNull();
      expect(typeof ChartController.chart).toBe('object');
    });
  });

  describe('on bootstrap', function() {

    it('should fetch chart with id', function() {
      $httpBackend.expect('GET', '/api/v1/charts/1');
      $httpBackend.flush();
    });

    it('should set `chart` model when request success', function() {
      getChartByIdRequestHandler.respond({ _id: '1' });
      $httpBackend.flush();

      expect(ChartController.chart).toEqual({ _id: '1' });
    });

    it('should do nothing when request error', function() {
      ChartController.chart = {};

      getChartByIdRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartController.chart).toEqual({});
    });

    it('should generate data table download link', function() {
      getChartByIdRequestHandler.respond({ _id: '1' });
      $httpBackend.flush();

      expect(ChartController.downloadLink)
        .toBe('http://localhost/api/v1/charts/1/datatable?format=xlsx');
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('init()', function() {

      it('should call `loadChart()` with `ChartController.id`', function() {
        spyOn(ChartController, 'loadChart');
        ChartController.id = '1';

        ChartController.init();

        expect(ChartController.loadChart).toHaveBeenCalledWith('1');
      });
    });

    describe('loadChart()', function() {

      it('should fetch chart with given id', function() {
        ChartController.loadChart('1');

        $httpBackend.expect('GET', '/api/v1/charts/1');
        $httpBackend.flush();
      });

      it('should set `chart` model when request success', function() {
        ChartController.loadChart('1');
        getChartByIdRequestHandler.respond({ _id: '1' });
        $httpBackend.flush();

        expect(ChartController.chart).toEqual({ _id: '1' });
      });

      it('should do nothing when request error', function() {
        ChartController.chart = {};

        ChartController.loadChart('1');
        getChartByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartController.chart).toEqual({});
      });
    });

    describe('onAutoReloadSwitchChange()', function() {

      beforeEach(function() {
        spyOn(ChartController, 'startAutoReloadChart');
        spyOn(ChartController, 'stopAutoReloadChart');
      });

      it('should do nothing without `isAutoReloadSwitchOn` param', function() {
        ChartController.onAutoReloadSwitchChange();

        expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
      });

      it('should call `startAutoReloadChart()` to start interval if passing isAutoReloadSwitchOn = true', function() {
        ChartController.onAutoReloadSwitchChange(true);

        expect(ChartController.startAutoReloadChart).toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
      });

      it('should call `stopAutoReloadChart()` to cancel interval if passing isAutoReloadSwitchOn = false', function() {
        ChartController.onAutoReloadSwitchChange(false);

        expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).toHaveBeenCalled();
      });
    });

    describe('onAutoReloadSwitchChange()', function() {

      beforeEach(function() {
        spyOn(ChartController, 'startAutoReloadChart');
        spyOn(ChartController, 'stopAutoReloadChart');
      });

      it('should return directly if not passing `isAutoReloadSwitchOn` param', function() {
        ChartController.onAutoReloadSwitchChange();

        expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
      });

      it('should call `startAutoReloadChart()` to start interval if passing isAutoReloadSwitchOn = true', function() {
        ChartController.onAutoReloadSwitchChange(true);

        expect(ChartController.startAutoReloadChart).toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).not.toHaveBeenCalled();
      });

      it('should call `stopAutoReloadChart()` to cancel interval if passing isAutoReloadSwitchOn = false', function() {
        ChartController.onAutoReloadSwitchChange(false);

        expect(ChartController.startAutoReloadChart).not.toHaveBeenCalled();
        expect(ChartController.stopAutoReloadChart).toHaveBeenCalled();
      });
    });

    describe('startAutoReloadChart()', function() {

      it('should return a promise which will be notified on each iteration', function() {
        ChartController.autoReloadChartPromise = null;

        ChartController.startAutoReloadChart();

        expect(typeof ChartController.autoReloadChartPromise.then).toBe('function');
      });

      it('should trigger reload chart every second', function() {
        spyOn(ChartController, 'loadChart');
        ChartController.DELAY = 1000;
        ChartController.id = '1';

        ChartController.startAutoReloadChart();
        $interval.flush(1000);

        expect(ChartController.loadChart).toHaveBeenCalledWith('1');

        $interval.flush(1000);

        expect(ChartController.loadChart).toHaveBeenCalledWith('1');
        expect(ChartController.loadChart).toHaveBeenCalledTimes(2);
      });
    });

    describe('stopAutoReloadChart()', function() {

      it('should call cancel the interval task via `autoReloadChartPromise`', function() {
        var mockPromise = { then: function() {} };

        spyOn($interval, 'cancel').and.callThrough();
        ChartController.autoReloadChartPromise = mockPromise;

        ChartController.stopAutoReloadChart();

        expect($interval.cancel).toHaveBeenCalledWith(mockPromise);
      });

      it('should return false if the task is not successfully cancelled', function() {
        var result;

        ChartController.autoReloadChartPromise = null;

        result = ChartController.stopAutoReloadChart();

        expect(result).toBe(false);
      });

      it('should return true if the task is successfully cancelled', function() {
        var result;

        spyOn(ChartController, 'loadChart');
        ChartController.DELAY = 1000;
        ChartController.startAutoReloadChart();
        $interval.flush(1000);

        result = ChartController.stopAutoReloadChart();

        expect(result).toBe(true);
      });
    });

    describe('showShare()', function() {

      it('should use EEDialogService to show a sharing dialog', function() {
        spyOn($location, 'absUrl').and.returnValue('eagleeye');

        ChartController.showShare('title');

        expect($mdDialog.show).toHaveBeenCalledWith({
          locals: {
            sharedTitle: 'title',
            sharedLink: 'eagleeye'
          },
          controller: 'ShareDialogController as ctrl',
          templateUrl: 'scripts/templates/share.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        });
      });
    });

    describe('generateDownloadLink()', function() {

      it('should generate a download link', function() {
        var id = '123';
        var format = 'xlsx';
        ChartController.downloadLink = '';

        ChartController.generateDownloadLink(id, format)
          .then(function(link) {
            expect(link).toBe('http://localhost/api/v1/charts/'
                              + id + '/datatable?format=' + format);
          })
          .catch(function(error) {
            fail(error);
          });

        $rootScope.$digest();
      });
    });
  });
});
