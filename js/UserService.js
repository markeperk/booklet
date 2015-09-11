angular.module('myApp')

.factory('UserService', function() {
  var defaults = {
    location: 'autoip'
  };

  var service = {
    user: {},
    save: function() {
      sessionStorage.presently =
        angular.toJson(service.user);
    },
    restore: function() {
      // Pull from sessionStorage
      service.user = 
        angular.fromJson(sessionStorage.presently) || defaults

      return service.user;
    }
  };
  // Immediately call restore from the session storage
  // so we have our user data available immediately
  service.restore();
  return service;
})