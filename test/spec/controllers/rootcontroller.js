'use strict';

describe('Controller: RootController', function() {
  // load the controller's module
  beforeEach(function() {
    module('eagleeye', function($provide) {
      $provide.value('config', {
        "data": {
          "root_endpoint": "http://127.0.0.1:3000/"
        }
      });
    })
  });

  var RootController,
    $state,
    EagleEyeWebService,
    config;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$state_, _EagleEyeWebService_, _config_) {
    $state = _$state_;
    EagleEyeWebService = _EagleEyeWebService_;
    config = _config_;

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
