'use strict';

describe('Directive: eeFriendlyUrlValidator', function () {

  // load the directive's module
  beforeEach(module('eagleeye'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ee-friendly-url-validator></ee-friendly-url-validator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the friendlyUrlValidator directive');
  }));
});
