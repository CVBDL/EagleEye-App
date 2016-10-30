angular.module('EEDialogServiceMock', [])
  .factory('EEDialogService', function($q) {
    var qShowDeleteConfirmation;

    var showChartCreationHelping = jasmine.createSpy('showChartCreationHelping');
    var showSharing = jasmine.createSpy('showSharing');
    var showDeleteConfirmation = jasmine.createSpy('showDeleteConfirmation').and.callFake(function() {
      qShowDeleteConfirmation = $q.defer();

      return qShowDeleteConfirmation.promise;
    });

    return {
      showChartCreationHelping: showChartCreationHelping,
      showSharing: showSharing,
      showDeleteConfirmation: showDeleteConfirmation,
      resolveShowDeleteConfirmation: function(value) { qShowDeleteConfirmation.resolve(value); },
      rejectShowDeleteConfirmation: function(reason) { qShowDeleteConfirmation.reject(reason); }
    };
  });
