'use strict';

describe('Service: eeDeleteConfirmationService', function () {

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var eeDeleteConfirmationService;
  beforeEach(inject(function (_eeDeleteConfirmationService_) {
    eeDeleteConfirmationService = _eeDeleteConfirmationService_;
  }));

  it('should do something', function () {
    expect(!!eeDeleteConfirmationService).toBe(true);
  });

});
