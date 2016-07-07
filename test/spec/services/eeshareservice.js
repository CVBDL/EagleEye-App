'use strict';

describe('Service: eeShareService', function () {

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var eeShareService;
  beforeEach(inject(function (_eeShareService_) {
    eeShareService = _eeShareService_;
  }));

  it('should do something', function () {
    expect(!!eeShareService).toBe(true);
  });

});
