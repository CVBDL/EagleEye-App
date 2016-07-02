'use strict';

describe('Service: EagleEyeWebService', function () {

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var EagleEyeWebService;
  beforeEach(inject(function (_EagleEyeWebService_) {
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  it('should do something', function () {
    expect(!!EagleEyeWebService).toBe(true);
  });

});
