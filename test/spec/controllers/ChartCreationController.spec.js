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

  it('should initialize `chartTypeOptions` model', function() {
    expect(ChartCreationController.chartTypeOptions).toEqual({ foo: 1 });
  });

  it('should initialize `isStackedOptions` model', function() {
    expect(ChartCreationController.isStackedOptions).toEqual({ bar: 1 });
  });

  it('should initialize `axisFormatOptions` model', function() {
    expect(ChartCreationController.axisFormatOptions).toEqual({ foobar: 1 });
  });

  it('should initialize `chart` model', function() {
    expect(angular.isObject(ChartCreationController.chart)).toBe(true);
    expect(ChartCreationController.chart.chartType).toBeDefined();
    expect(ChartCreationController.chart.domainDataType).toBeDefined();
    expect(ChartCreationController.chart.description).toBeDefined();
    expect(ChartCreationController.chart.friendlyUrl).toBeDefined();
    expect(angular.isObject(ChartCreationController.chart.options)).toBe(true);
    expect(ChartCreationController.chart.options.title).toBeDefined();
    expect(ChartCreationController.chart.options.combolines).toBeDefined();
    expect(ChartCreationController.chart.options.isStacked).toBeDefined();
    expect(angular.isObject(ChartCreationController.chart.options.hAxis)).toBe(true);
    expect(ChartCreationController.chart.options.hAxis.title).toBeDefined();
    expect(ChartCreationController.chart.options.hAxis.format).toBeDefined();
    expect(angular.isObject(ChartCreationController.chart.options.vAxis)).toBe(true);
    expect(ChartCreationController.chart.options.vAxis.title).toBeDefined();
    expect(ChartCreationController.chart.options.vAxis.format).toBeDefined();
    expect(angular.isObject(ChartCreationController.chart.options.chartArea)).toBe(true);
    expect(ChartCreationController.chart.options.chartArea.left).toBeDefined();
    expect(ChartCreationController.chart.options.chartArea.width).toBeDefined();
  });

  it('should set default chart type to "ColumnChart"', function() {
    expect(ChartCreationController.chart.chartType).toBe('ColumnChart');
  });

  it('should set default domain data type to "string"', function() {
    expect(ChartCreationController.chart.domainDataType).toBe('string');
  });

  it('should set default axis format to ""', function() {
    expect(ChartCreationController.chart.options.hAxis.format).toBe('');
    expect(ChartCreationController.chart.options.vAxis.format).toBe('');
  });

  describe('showHelp()', function() {
    it('should use EEDialogService to show help dialog', function() {
      ChartCreationController.showHelp();

      expect(EEDialogService.showChartCreationHelping).toHaveBeenCalled();
    });
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

    it('should return an object of generated payload', function() {
      expect(typeof payload).toBe('object');
      expect(payload).not.toBeNull();
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
