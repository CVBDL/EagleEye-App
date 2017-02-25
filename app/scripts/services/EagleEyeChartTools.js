'use strict';

angular.module('eagleeye')

/**
 * @ngdoc service
 * @name eagleeye.EagleEyeChartTools
 */
.factory('EagleEyeChartTools', [
  '$rootScope',
  '$window',
  function EagleEyeChartTools($rootScope, $window) {
    var self = {};

    self.saveAsImage = function(id) {
      if (!id) return;

      var remove = $rootScope.$on(
        'ee.googlechart.imageURI',
        function(evt, args) {
          var imageURI = args.imageURI;

          if (args.id !== id) return;

          if (imageURI) {
            $window.open(imageURI, 'Save the image');
          }

          remove();
        });

      $rootScope.$emit('ee.googlechart.getImageURI', id);
    };

    return self;
  }
]);
