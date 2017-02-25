'use strict';

describe('Service: EagleEyeChartTools', function() {
  var $rootScope,
    $window;

  var EagleEyeChartTools;

  // load main module
  beforeEach(module('eagleeye'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(
      _$rootScope_, _$window_, _EagleEyeChartTools_) {

    $rootScope = _$rootScope_;
    $window = _$window_;
    EagleEyeChartTools = _EagleEyeChartTools_;
  }));

  describe('saveAsImage():', function() {

    it('should open new window to show image', function() {
      var id ='id';
      var imageURI = 'data:image/png;';

      spyOn($window, 'open');

      $rootScope.$on('ee.googlechart.getImageURI', function(evt, id) {
        $rootScope.$emit('ee.googlechart.imageURI', {
          id: id,
          imageURI: imageURI
        });
      });

      EagleEyeChartTools.saveAsImage(id);

      expect($window.open).toHaveBeenCalledWith(imageURI, 'Save the image');
    });

    it('should do nothing if id not match', function() {
      var id ='id';
      var imageURI = 'data:image/png;';

      spyOn($window, 'open');

      $rootScope.$on('ee.googlechart.getImageURI', function(evt, id) {
        $rootScope.$emit('ee.googlechart.imageURI', {
          id: 'not-match',
          imageURI: imageURI
        });
      });

      EagleEyeChartTools.saveAsImage(id);

      expect($window.open).not.toHaveBeenCalled();
    });

    it('should remove listener after calling once', function() {
      var id ='id';
      var imageURI = 'data:image/png;';

      spyOn($window, 'open');

      $rootScope.$on('ee.googlechart.getImageURI', function(evt, id) {
        $rootScope.$emit('ee.googlechart.imageURI', {
          id: id,
          imageURI: imageURI
        });
      });

      EagleEyeChartTools.saveAsImage(id);
      $rootScope.$emit('ee.googlechart.getImageURI', id);
      $rootScope.$emit('ee.googlechart.getImageURI', id);

      expect($window.open).toHaveBeenCalledTimes(1);
    });
  });
});
