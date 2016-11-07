angular.module('ngMaterialMock', [])

.factory('$mdMedia', function() {
  return jasmine.createSpy('$mdMedia').and.returnValue(true);
})

.factory('$mdDialog', function($q) {
  var qShow;

  var show = jasmine.createSpy('show').and.callFake(function() {
   qShow = $q.defer();

   return qShow.promise;
  });
  var hide = jasmine.createSpy('hide').and.callFake(function(value) {
    qShow.resolve(value);
  });
  var cancel = jasmine.createSpy('cancel').and.callFake(function(reason) {
    qShow.reject(reason);
  });

  return {
    show: show,
    hide: hide,
    cancel: cancel
  };
});
