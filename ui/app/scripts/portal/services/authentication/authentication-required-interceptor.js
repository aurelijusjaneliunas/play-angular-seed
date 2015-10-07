angular.module('todo-app').factory('authenticationRequiredInterceptor', function authenticationRequiredInterceptor($rootScope, $q) {

  var redirectToLoginIfNeeded = function (response) {
    if (response.status === 403 || response.status === 401) {
      $rootScope.redirectToLogin();
    }
  };

  return {
    // optional method
    'response': function (response) {
      // do something on success
      return response;
    },
    // optional method
    'responseError': function (response) {
      redirectToLoginIfNeeded(response);
      return $q.reject(response);
    }
  };

});
