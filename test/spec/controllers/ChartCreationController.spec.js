'use strict';

describe('Controller: ChartCreationController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    GoogleChartsService,
    EagleEyeWebService,
    EEDialogService,
    CHART_TYPE_OPTIONS,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load GoogleChartsService mock module
  beforeEach(module('GoogleChartsServiceMock'));

  // load EEDialogService mock module
  beforeEach(module('EEDialogServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.constant('CHART_TYPE_OPTIONS', { foo: 1 });
    $provide.constant('IS_STACKED_OPTIONS', { bar: 1 });
    $provide.constant('AXIS_FORMAT_OPTIONS', { foobar: 1 });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _EagleEyeWebService_, _GoogleChartsService_, _EEDialogService_, _CHART_TYPE_OPTIONS_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    EEDialogService = _EEDialogService_;
    CHART_TYPE_OPTIONS = _CHART_TYPE_OPTIONS_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(inject(function() {
    ChartCreationController = $controller('ChartCreationController', {
      $state: $state,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      EEDialogService: EEDialogService,
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
    expect(EEDialogService.showChartCreationHelping).toHaveBeenCalled();
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

    it('should return a payload object', function() {
      expect(typeof payload).toBe('object');
      expect(payload).not.toBe(null);
    });

    it('should make chart description payload', function() {
      expect(payload.description).toBe('foo');
    });

    it('should make chart type payload', function() {
      expect(GoogleChartsService.makeChartType).toHaveBeenCalledWith('LineChart');
      expect(payload.chartType).toBe('LineChart');
    });

    it('should make friendlyUrl payload', function() {
      expect(EagleEyeWebService.makeFriendlyUrl).toHaveBeenCalledWith('chart', 'friendly-url');
      expect(payload.friendlyUrl).toBe('x-friendly-url');
    });

    it('should make domainDataType payload', function() {
      expect(GoogleChartsService.makeDomainDataType).toHaveBeenCalledWith('string');
      expect(payload.domainDataType).toBe('string');
    });

    it('should make datatable payload', function() {
      expect(GoogleChartsService.getChartDataTableSamples).toHaveBeenCalledWith('LineChart', 'string');
      expect(payload.datatable).toEqual({
        "cols": [{}],
        "rows": [{}]
      });
    });

    it('should make options payload', function() {
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
