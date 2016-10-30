'use strict';

describe('Controller: ChartSetSettingsController', function () {
  var $controller,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    $stateParams,
    EagleEyeWebService;

  var ChartSetSettingsController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // mock dependent services
  beforeEach(module(function($provide) {
    $provide.factory('$stateParams', function() {
      return { id: 'id' };
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
  });

  it('should initialize search box data model', function() {
    expect(ChartSetSettingsController.searchKeyword).toBeDefined();
  });

  it('should initialize chart set data model', function() {
    expect(ChartSetSettingsController.chartset).toBeDefined();
    expect(typeof ChartSetSettingsController.chartset).toBe('object');
    expect(ChartSetSettingsController.chartset.title).toBe('');
    expect(ChartSetSettingsController.chartset.description).toBe('');
    expect(ChartSetSettingsController.chartset.friendlyUrl).toBe('');
    expect(ChartSetSettingsController.chartset.charts).toEqual([]);
  });

  it('should load chart set and charts when bootstrap', function() {
    expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
    expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
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

    it('should call makeFriendlyUrl()', function() {
      ChartSetSettingsController.makeChartSetPayload({ friendlyUrl: 'foo' });
      expect(EagleEyeWebService.makeFriendlyUrl).toHaveBeenCalledWith('chartset', 'foo');
    });

    it('should call makeChartsList()', function() {
      ChartSetSettingsController.makeChartSetPayload({ charts: [] });
      expect(ChartSetSettingsController.makeChartsList).toHaveBeenCalledWith([]);
    });
  });

  describe('save()', function() {
    beforeEach(function() {
      spyOn(ChartSetSettingsController, 'makeChartSetPayload').and.callFake(function() {
        return { name: 'payload' };
      });

      spyOn($state, 'go');
    });

    it('should call makeChartSetPayload() to make payload', function() {
      var chart = { _id: 'id' };
      ChartSetSettingsController.save(chart);
      expect(ChartSetSettingsController.makeChartSetPayload).toHaveBeenCalledWith(chart);
    });

    it('should call EagleEyeWebService with payload to create chart set', function() {
      var chart = { _id: 'id' };
      ChartSetSettingsController.save(chart);
      expect(EagleEyeWebService.updateChartSetById).toHaveBeenCalledWith('id', { name: 'payload' });
    });

    it('should to to chartSet state after creating chart set', function() {
      var chart = { _id: 'id' };
      ChartSetSettingsController.save(chart);
      EagleEyeWebService.resolveUpdateChartSetById({ _id: '_id' });
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalledWith('chartSets');
    });
  });

  describe('loadChartList()', function() {
    it('should call EagleEyeWebService to fetch charts', function() {
      ChartSetSettingsController.loadChartList();
      expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
    });

    it('should refresh charts in controller', function() {
      ChartSetSettingsController.loadChartList();
      EagleEyeWebService.resolveGetCharts([{ id: 1 }]);
      $rootScope.$digest();
      expect(ChartSetSettingsController.chartList).toEqual([{ id: 1 }]);
    });
  });

  describe('loadChartSet()', function() {
    it('should call EagleEyeWebService to fetch chart set data', function() {
      ChartSetSettingsController.loadChartSet('id');
      expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
    });

    it('should set controller chart model after fetching chart', function() {
      ChartSetSettingsController.loadChartSet('id');
      expect(EagleEyeWebService.getChartSetById).toHaveBeenCalledWith('id');
      EagleEyeWebService.resolveGetChartSetById({ id: 'id', friendlyUrl: '' });
      $rootScope.$digest();
      expect(ChartSetSettingsController.chartset).toEqual({ id: 'id', friendlyUrl: '' });
    });
  });
});
