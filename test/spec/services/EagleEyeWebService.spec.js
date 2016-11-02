'use strict';

describe('Service: EagleEyeWebService', function() {

  var chartId                      = '57837029c66dc1a4570962b6';
  var rootEndpoint                 = 'http://8.8.8.8:6666/';
  var webServiceBaseUrl            = rootEndpoint + 'api/v1/';
  var staticServerSideImageBaseUrl = rootEndpoint + 'uploadChartImages/';
  var excelTemplateDownloadBaseUrl = webServiceBaseUrl + 'download/excels/';
  var excelTemplateDownloadUrl     = webServiceBaseUrl + 'download/excels/' + chartId;

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var EagleEyeWebService,
    $httpBackend;

  beforeEach(inject(function (_EagleEyeWebService_) {
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));
});
