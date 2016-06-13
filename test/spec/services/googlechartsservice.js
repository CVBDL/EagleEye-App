'use strict';

describe('Service: GoogleChartsService', function () {

  // load the service's module
  beforeEach(module('eagleEyeApp'));

  // instantiate service
  var GoogleChartsService;
  beforeEach(inject(function (_GoogleChartsService_) {
    GoogleChartsService = _GoogleChartsService_;
  }));

  it('should do something', function () {
    expect(!!GoogleChartsService).toBe(true);
  });

});
