'use strict';

describe('Controller: RootController', function() {
  var $controller,
    $rootScope,
    $state,
    config,
    EagleEyeWebService,
    RootController;

  beforeEach(function() {
    module('eagleeye', function($provide) {
      $provide.value('config', {
        "data": {
          "root_endpoint": "http://127.0.0.1:3000/"
        }
      });
    })
  });

  beforeEach(inject(function($injector) {
    $controller        = $injector.get('$controller');
    $rootScope         = $injector.get('$rootScope');
    $state             = $injector.get('$state');
    config             = $injector.get('config');
    EagleEyeWebService = $injector.get('EagleEyeWebService');

    spyOn(EagleEyeWebService, 'setRootEndpoint');

    RootController = $controller('RootController', {
      EagleEyeWebService: EagleEyeWebService,
      config: config
    });
  }));

  it('should init RootController correctly', function() {
    expect(RootController).toBeDefined();
  });

  it('should init EagleEyeWebService root endpoint', function() {
    expect(EagleEyeWebService.setRootEndpoint).toHaveBeenCalledWith("http://127.0.0.1:3000/");
  });
});
