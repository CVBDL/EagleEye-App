'use strict';

describe('Controller: ChartCreationController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $templateCache,
    GoogleChartsService,
    EagleEyeWebService,
    eeHelpDialogService,
    CHART_TYPE_OPTIONS,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.factory('GoogleChartsService', function() {
      var makeChartType = jasmine.createSpy('makeChartType').and.callFake(function(chartType) {
        return 'LineChart';
      });
      var makeDomainDataType = jasmine.createSpy('makeDomainDataType').and.callFake(function(domainDataType) {
        return 'string';
      });
      var makeFriendlyUrl = jasmine.createSpy('makeFriendlyUrl').and.callFake(function(type, url) {
        return 'c-friendly-url';
      });
      var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function(chartType, domainDataType) {
        return {};
      });
      var makeConfigurationOptions = jasmine.createSpy('makeConfigurationOptions').and.callFake(function(chartType, options) {
        return {};
      });

      return {
        makeChartType: makeChartType,
        makeDomainDataType: makeDomainDataType,
        makeFriendlyUrl: makeFriendlyUrl,
        getChartDataTableSamples: getChartDataTableSamples,
        makeConfigurationOptions: makeConfigurationOptions,
      };
    });

    $provide.factory('EagleEyeWebService', function($q) {
      var qCreateChart;

      var createChart = jasmine.createSpy('createChart').and.callFake(function(payload) {
        qCreateChart = $q.defer();

        return qCreateChart.promise;
      });

      return {
        createChart: createChart,
        resolveCreateChart: function(value) { qCreateChart.resolve(value); },
        rejectCreateChart: function(reason) { qCreateChart.reject(reason); }
      };
    });

    $provide.factory('eeHelpDialogService', function() {
      return {
        showHelp: jasmine.createSpy('showHelp')
      };
    });

    $provide.constant('CHART_TYPE_OPTIONS', { foo: 1 });
    $provide.constant('IS_STACKED_OPTIONS', { bar: 1 });
    $provide.constant('AXIS_FORMAT_OPTIONS', { foobar: 1 });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$templateCache_, _EagleEyeWebService_, _GoogleChartsService_, _eeHelpDialogService_, _CHART_TYPE_OPTIONS_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $templateCache = _$templateCache_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    eeHelpDialogService = _eeHelpDialogService_;
    CHART_TYPE_OPTIONS = _CHART_TYPE_OPTIONS_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(inject(function($controller, $rootScope) {
    ChartCreationController = $controller('ChartCreationController', {
      $state: $state,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      eeHelpDialogService: eeHelpDialogService,
      CHART_TYPE_OPTIONS: CHART_TYPE_OPTIONS,
      IS_STACKED_OPTIONS: IS_STACKED_OPTIONS,
      AXIS_FORMAT_OPTIONS: AXIS_FORMAT_OPTIONS
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartCreationController).toBeDefined();
  });

  it('should initialize chart type options', function() {
    expect(ChartCreationController.chartTypeOptions).toEqual({ foo: 1 });
  });

  it('should initialize isStacked options', function() {
    expect(ChartCreationController.isStackedOptions).toEqual({ bar: 1 });
  });

  it('should initialize format options', function() {
    expect(ChartCreationController.axisFormatOptions).toEqual({ foobar: 1 });
  });

  it('should have required model objects', function() {
    expect(angular.isObject(ChartCreationController.chart)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.hAxis)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.vAxis)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.chartArea)).toBe(true);
  });

  it('should set default chart type to column chart', function() {
    expect(ChartCreationController.chart.domainDataType).toBe('string');
  });

  it('should set default domain data type to string', function() {
    expect(ChartCreationController.chart.domainDataType).toBe('string');
  });

  it('should set default axis format', function() {
    expect(ChartCreationController.chart.options.hAxis.format).toBe('');
    expect(ChartCreationController.chart.options.vAxis.format).toBe('');
  });

  it('should be able to show help dialog', function() {
    ChartCreationController.showHelp();
    expect(eeHelpDialogService.showHelp).toHaveBeenCalled();
  });

  describe('makeChartPayload()', function() {
    var chart,
      payload;

    beforeEach(function() {
      chart = {
        chartType: 'LineChart',
        description: 'foo',
        domainDataType: 'string',
        friendlyUrl: 'friendly-url',
        datatable: {},
        options: {}
      };

      payload = ChartCreationController.makeChartPayload(chart);
    });

    it('makeChartPayload() should return a payload object', function() {
      expect(typeof payload).toBe('object');
      expect(payload).not.toBe(null);
    });

    it('makeChartPayload() should make chart description payload', function() {
      expect(payload.description).toBe('foo');
    });

    it('makeChartPayload() should make chart type payload', function() {
      expect(GoogleChartsService.makeChartType).toHaveBeenCalledWith('LineChart');
      expect(payload.chartType).toBe('LineChart');
    });

    it('makeChartPayload() should make friendlyUrl payload', function() {
      expect(GoogleChartsService.makeFriendlyUrl).toHaveBeenCalledWith('chart', 'friendly-url');
      expect(payload.friendlyUrl).toBe('c-friendly-url');
    });

    it('makeChartPayload() should make domainDataType payload', function() {
      expect(GoogleChartsService.makeDomainDataType).toHaveBeenCalledWith('string');
      expect(payload.domainDataType).toBe('string');
    });

    it('makeChartPayload() should make datatable payload', function() {
      expect(GoogleChartsService.getChartDataTableSamples).toHaveBeenCalledWith('LineChart', 'string');
      expect(payload.datatable).toEqual({});
    });

    it('makeChartPayload() should make options payload', function() {
      expect(GoogleChartsService.makeConfigurationOptions).toHaveBeenCalledWith('LineChart', {});
      expect(payload.options).toEqual({});
    });
  });

  describe('save()', function() {
    beforeEach(function() {
      spyOn(ChartCreationController, 'makeChartPayload').and.returnValue({});
      spyOn($state, 'go');
    });

    it('should make chart payload first', function() {
      var chart = {};

      ChartCreationController.save(chart);

      expect(ChartCreationController.makeChartPayload).toHaveBeenCalledWith(chart);
    });

    it('should go to chart settings page when create successfully', function() {
      var chart = {};

      ChartCreationController.save(chart);

      expect(EagleEyeWebService.createChart).toHaveBeenCalledWith(chart);

      EagleEyeWebService.resolveCreateChart({ _id: 'id' });
      $rootScope.$digest();

      expect($state.go).toHaveBeenCalledWith('chartSettings', { id: 'id' });
    });

    it('should not go to chart settings page when create successfully', function() {
      var chart = {};

      ChartCreationController.save(chart);

      expect(EagleEyeWebService.createChart).toHaveBeenCalledWith(chart);

      EagleEyeWebService.rejectCreateChart();
      $rootScope.$digest();

      expect($state.go).not.toHaveBeenCalled();
    });
  });

});
