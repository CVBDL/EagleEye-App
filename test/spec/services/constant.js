'use strict';

describe('Constant service', function () {

  // load the service's module
  beforeEach(module('eagleeye'));

  // instantiate service
  var FEEDBACK_EMAIL;

  beforeEach(inject(function (_FEEDBACK_EMAIL_) {
    FEEDBACK_EMAIL = _FEEDBACK_EMAIL_;
  }));

  it('should set correct FEEDBACK_EMAIL', function() {
    expect(FEEDBACK_EMAIL).toBe('pzhong@ra.rockwell.com');
  });

});
