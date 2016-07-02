'use strict';

describe('Directive: eeGoogleChart', function () {

  // load the directive's module
  beforeEach(module('eagleeye'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<ee-google-chart></ee-google-chart>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the eeGoogleChart directive');
  // }));
});
