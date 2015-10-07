angular.module('todo-app').factory('httpCommon', function httpCommon($q, $http, $cookies, gettextCatalog) {

  return {

    request: function (args) {

      // Continue
      params = args.params || {};
      args = args || {};
      var deferred = $q.defer(),
        url = args.url,
        method = args.method || 'GET',
        params = params,
        data = args.data || {};
      // Fire the request, as configured.
      $http({
        url: url,
        withCredentials: true,
        method: method.toUpperCase(),
        params: params,
        data: data
      })
        .success(function (data, status, headers, config) {

          deferred.resolve(data, status);

        })
        .error(function (data, status, headers, config) {

          // Set request status
          if (data) {
            data.status = status;
          }

          if (status === 0) {
            if (data === '') {
              data = {};
              data.status = 0;
            }
            // or if the data is null, then there was a timeout.
            if (data === null) {
              // Inject a non field error alerting the user
              // that there's been a timeout error.
              data = {};
              data.status = 0;
            }
          }

          deferred.reject(data, status, headers, config);

        });

      return deferred.promise;

    }

  };

});
