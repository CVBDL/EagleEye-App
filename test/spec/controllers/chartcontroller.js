'use strict';

describe('Controller: ChartController', function () {
  var id = '57ee0e635d2722401b951c35',
    imageEndpoint = 'http://127.0.0.1:3000/uploadChartImages/',
    chart = {
      "_id": "57ee0e635d2722401b951c35",
      "description": "",
      "domainDataType": "string",
      "options": {
        "title": "Image",
        "hAxis": {},
        "vAxis": {},
        "combolines": "",
        "isStacked": false,
        "chartArea": {}
      },
      "chartType": "ImageChart",
      "datatable": {},
      "type": "ImageChart",
      "image_file_name": "IC_763393rs34HDxVFhQs1OF5fUIFDJxn.png",
      "browserDownloadUrl": {
        "excel": null
      },
      "createdAt": "2016-09-30T07:04:03.534Z",
      "updatedAt": "2016-09-30T07:04:23.430Z"
    };

  var $controller,
    $q,
    $rootScope,
    $state,
    $stateParams,
    $httpBackend,
    $location,
    $interval,
    EagleEyeWebService,
    GoogleChartsService,
    eeShareService,
    eeSaveAsPDFService;

  var ChartController,
    scope;

  beforeEach(module('eagleeye'));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise( function(){ return false; });
  }));

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$state_, _$stateParams_, _$httpBackend_, _$location_, _$interval_, _EagleEyeWebService_, _GoogleChartsService_, _eeShareService_, _eeSaveAsPDFService_) {
    $controller = _$controller_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $interval = _$interval_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    eeShareService = _eeShareService_;
    eeSaveAsPDFService = _eeSaveAsPDFService_;
  }));

  beforeEach(function () {
    spyOn(EagleEyeWebService, 'getChartById').and.callFake(function() {
      return $q.when(chart);
    });
  });

  beforeEach(function () {
    $stateParams.id = id;
    ChartController = $controller('ChartController', {
      $state: $state,
      $stateParams: $stateParams,
      $location: $location,
      $interval: $interval,
      EagleEyeWebService: EagleEyeWebService,
      GoogleChartsService: GoogleChartsService,
      eeShareService: eeShareService,
      eeSaveAsPDFService: eeSaveAsPDFService
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize correctly', function () {
    // expect(ChartController).toBeDefined();
    // expect(ChartController.chart).toEqual({});
    // expect(ChartController.autoReloadSwitch).toBe(false);
    // expect(ChartController.imageChartBaseUrl).toBe('');
    // expect(EagleEyeWebService.getStaticServerSideImageBaseUrl).toHaveBeenCalled();
    // expect(EagleEyeWebService.getChartById).toHaveBeenCalledWith(id);
    // $rootScope.$digest();
    // expect(ChartController.chart).toEqual(chart);
    // expect(ChartController.autoReloadSwitch).toBe(false);
    // expect(ChartController.imageChartBaseUrl).toBe(imageEndpoint);
  });
});
