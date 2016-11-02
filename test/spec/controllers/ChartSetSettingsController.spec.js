'use strict';

describe('Controller: ChartSetSettingsController', function() {
  var $controller,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    $stateParams,
    EagleEyeWebService;

  var ChartSetSettingsController,
    getChartsRequestHandler,
    getChartSetByIdRequestHandler,
    updateChartSetByIdRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

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

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$q_, _$rootScope_, _$state_, _$stateParams_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(function() {
    getChartsRequestHandler = $httpBackend.when('GET', '/api/v1/charts').respond([]);
    getChartSetByIdRequestHandler = $httpBackend.when('GET', '/api/v1/chart-sets/1').respond({});
    updateChartSetByIdRequestHandler = $httpBackend.when('PUT', '/api/v1/chart-sets/1').respond({});
  });

  beforeEach(inject(function($controller, $rootScope) {
    ChartSetSettingsController = $controller('ChartSetSettingsController', {
      $state: $state,
      $stateParams: $stateParams,
      $q: $q,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSetSettingsController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `id` model', function() {
      expect(ChartSetSettingsController.id).toBe('1');
    });

    it('should initialize `searchKeyword` model', function() {
      expect(ChartSetSettingsController.searchKeyword).toBe('');
    });

    it('should initialize `chartset` model', function() {
      expect(ChartSetSettingsController.chartset).toBeDefined();
      expect(typeof ChartSetSettingsController.chartset).toBe('object');
      expect(ChartSetSettingsController.chartset.title).toBe('');
      expect(ChartSetSettingsController.chartset.description).toBe('');
      expect(ChartSetSettingsController.chartset.friendlyUrl).toBe('');
      expect(ChartSetSettingsController.chartset.charts).toEqual([]);
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch chart set using `$stateParams.id`', function() {
      $httpBackend.expect('GET', '/api/v1/chart-sets/1');
      $httpBackend.flush();
    });

    it('should make a GET request to fetch all charts', function() {
      $httpBackend.expect('GET', '/api/v1/charts');
      $httpBackend.flush();
    });

    it('should mark `checked` to true if a chart is in `chartset.charts` ', function() {
      var chartset = {
        charts: [
          { _id: '2', bar: 'bar' },
          { _id: '3', foobar: 'foobar' }
        ]
      };
      var charts = [
        { _id: '1', foo: 'foo' },
        { _id: '2', bar: 'bar' },
        { _id: '3', foobar: 'foobar' }
      ];
      var updatedCharts = [
        { _id: '1', foo: 'foo' },
        { _id: '2', checked: true, bar: 'bar' },
        { _id: '3', checked: true, foobar: 'foobar' }
      ];

      ChartSetSettingsController.chartList = [];
      ChartSetSettingsController.chartset = {};

      getChartSetByIdRequestHandler.respond(chartset);
      getChartsRequestHandler.respond(charts);
      $httpBackend.flush();

      expect(ChartSetSettingsController.chartList).toEqual(updatedCharts);
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('makeDisplayFriendlyUrl()', function() {
      it('should return empty string if input friendlyUrl is not a string', function() {
        expect(ChartSetSettingsController.makeDisplayFriendlyUrl()).toBe('');
        expect(ChartSetSettingsController.makeDisplayFriendlyUrl({})).toBe('');
      });

      it('should return empty string if input friendlyUrl is an empty string', function() {
        expect(ChartSetSettingsController.makeDisplayFriendlyUrl('')).toBe('');
      });

      it('should remove prefix for displaying friendly url', function() {
        expect(ChartSetSettingsController.makeDisplayFriendlyUrl('s-url')).toBe('url');
      });
    });

    describe('filterFunction()', function() {
      it('should return true if chart title contains the keyword.', function() {
        ChartSetSettingsController.searchKeyword = 'foo';

        var result = ChartSetSettingsController.filterFunction({
          description: '',
          options: { title: 'title contains foo' }
        });

        expect(result).toBe(true);
      });

      it('should return true if chart description contains the keyword.', function() {
        ChartSetSettingsController.searchKeyword = 'foo';

        var result = ChartSetSettingsController.filterFunction({
          description: 'description contains foo',
          options: { title: '' }
        });

        expect(result).toBe(true);
      });

      it('should return true if chart title and description contain the keyword.', function() {
        ChartSetSettingsController.searchKeyword = 'foo';

        var result = ChartSetSettingsController.filterFunction({
          description: 'description contains foo',
          options: { title: 'title contains foo' }
        });

        expect(result).toBe(true);
      });

      it('should return false if chart title and description not contain the keyword.', function() {
        ChartSetSettingsController.searchKeyword = 'foo';

        var result = ChartSetSettingsController.filterFunction({
          description: '',
          options: { title: '' }
        });

        expect(result).toBe(false);
      });
    });

    describe('onChartCheckedStatusChange', function() {
      beforeEach(function() {
        ChartSetSettingsController.chartset.charts = [{ id: 1, checked: true }];
      });

      it('should add the chart to list the chart is checked', function() {
        var chart = { id: 2, checked: true };

        ChartSetSettingsController.onChartCheckedStatusChange(chart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([{
          id: 1,
          checked: true
        }, {
          id: 2,
          checked: true
        }]);
      });

      it('should remove the chart from list the chart is unchecked', function() {
        var chart = { id: 1, checked: false };

        ChartSetSettingsController.onChartCheckedStatusChange(chart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([]);
      });
    });

    describe('moveUp', function() {
      var firstChart,
        secondChart,
        thirdChart;

      beforeEach(function() {
        firstChart = { id: 1 };
        secondChart = { id: 2 };
        thirdChart = { id: 3 };
        ChartSetSettingsController.chartset.charts = [firstChart, secondChart, thirdChart];
      });

      it('should not change order if the chart to move is already the first one', function() {
        ChartSetSettingsController.moveUp(firstChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([firstChart, secondChart, thirdChart]);
      });

      it('should move up one level to be the first one', function() {
        ChartSetSettingsController.moveUp(secondChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([secondChart, firstChart, thirdChart]);
      });

      it('should move up one level normally', function() {
        ChartSetSettingsController.moveUp(thirdChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([firstChart, thirdChart, secondChart]);
      });
    });

    describe('moveDown', function() {
      var firstChart,
        secondChart,
        thirdChart;

      beforeEach(function() {
        firstChart = { id: 1 };
        secondChart = { id: 2 };
        thirdChart = { id: 3 };
        ChartSetSettingsController.chartset.charts = [firstChart, secondChart, thirdChart];
      });

      it('should not change order if the chart to move is already the last one', function() {
        ChartSetSettingsController.moveDown(thirdChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([firstChart, secondChart, thirdChart]);
      });

      it('should move down one level to be the last one', function() {
        ChartSetSettingsController.moveDown(secondChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([firstChart, thirdChart, secondChart]);
      });

      it('should move down one level normally', function() {
        ChartSetSettingsController.moveDown(firstChart);
        expect(ChartSetSettingsController.chartset.charts).toEqual([secondChart, firstChart, thirdChart]);
      });
    });

    describe('makeChartsList', function() {
      it('should return empty array if given empty charts array', function() {
        expect(ChartSetSettingsController.makeChartsList([])).toEqual([]);
      });

      it('should return array with chart _id property', function() {
        var charts = [{ _id: 'foo' }, { _id: 'bar' }];

        expect(ChartSetSettingsController.makeChartsList(charts)).toEqual(['foo', 'bar']);
      });
    });

    describe('makeChartSetPayload', function() {
      beforeEach(function() {
        spyOn(ChartSetSettingsController, 'makeChartsList').and.returnValue([]);
      });

      it('should return payload always contains title and description fields', function() {
        var payload;

        payload = ChartSetSettingsController.makeChartSetPayload({});
        expect(payload.title).toBeDefined();
        expect(payload.description).toBeDefined();
        expect(payload.friendlyUrl).toBeDefined();
        expect(payload.charts).toBeDefined();
      });

      it('should call makeChartsList()', function() {
        ChartSetSettingsController.makeChartSetPayload({ charts: [] });
        expect(ChartSetSettingsController.makeChartsList).toHaveBeenCalledWith([]);
      });
    });

    describe('save()', function() {
      var payload = { foo: 'foo' };

      beforeEach(function() {
        spyOn(ChartSetSettingsController, 'makeChartSetPayload').and.returnValue(payload);
        spyOn($state, 'go');
      });

      it('should prepare request payload by calling makeChartSetPayload()', function() {
        var chartset = { _id: 1 };

        ChartSetSettingsController.save(chartset);
        expect(ChartSetSettingsController.makeChartSetPayload).toHaveBeenCalledWith(chartset);
        $httpBackend.flush();
      });

      it('should make a PUT request to update chart set with generated payload', function() {
        var chartset = { _id: '1' };

        ChartSetSettingsController.save(chartset);
        $httpBackend.expect('PUT', '/api/v1/chart-sets/1', payload);
        $httpBackend.flush();
      });

      it('should navigate to chartSet state when request success', function() {
        var chartset = { _id: '1' };

        ChartSetSettingsController.save(chartset);
        $httpBackend.flush();
        expect($state.go).toHaveBeenCalledWith('chartSets');
      });
    });

    describe('loadChartList()', function() {

      it('should make a GET request to fetch all charts', function() {
        ChartSetSettingsController.loadChartList();

        $httpBackend.expect('GET', '/api/v1/charts');
        $httpBackend.flush();
      });

      it('should set `chartList` model when request success', function() {
        var chartList = [
          { _id: '1', foo: 'foo' },
          { _id: '2', bar: 'bar' }
        ];

        ChartSetSettingsController.loadChartList();
        getChartsRequestHandler.respond(chartList);
        $httpBackend.flush();

        expect(ChartSetSettingsController.chartList).toEqual(chartList);
      });

      it('should do nothing when request error', function() {
        ChartSetSettingsController.chartList = [];

        ChartSetSettingsController.loadChartList();
        getChartsRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSetSettingsController.chartList).toEqual([]);
      });
    });

    describe('loadChartSet()', function() {

      it('should make a GET request to fetch chart set by id', function() {
        var id = '1';

        ChartSetSettingsController.loadChartSet(id);

        $httpBackend.expect('GET', '/api/v1/chart-sets/1');
        $httpBackend.flush();
      });

      it('should set `chartList` model with `friendlyUrl` prefix removed when request success', function() {
        var id = '1';
        var chartset = {
          _id: '1',
          friendlyUrl: 's-chart-set'
        };
        var expectedChartset = {
          _id: '1',
          friendlyUrl: 'chart-set'
        };

        ChartSetSettingsController.loadChartSet(id);
        getChartSetByIdRequestHandler.respond(chartset);
        $httpBackend.flush();

        expect(ChartSetSettingsController.chartset).toEqual(expectedChartset);
      });

      it('should do nothing when request error', function() {
        var id = '1';

        ChartSetSettingsController.chartset = {};

        ChartSetSettingsController.loadChartSet(id);
        getChartSetByIdRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSetSettingsController.chartset).toEqual({});
      });
    });
  });
});
