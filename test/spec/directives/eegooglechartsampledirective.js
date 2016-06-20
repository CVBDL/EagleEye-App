'use strict';

describe('Directive: eeGoogleChartSampleDirective', function () {

  // load the directive's module
  beforeEach(module('eagleEyeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ee-google-chart-sample-directive></ee-google-chart-sample-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the eeGoogleChartSampleDirective directive');
  }));
});
