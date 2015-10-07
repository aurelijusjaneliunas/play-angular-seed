angular.module('todo-app').factory('ngTableCreator', function ngTableCreator(ngTableParams, helpers, $location, PAGINATION_COUNTERS) {
  return {
    createNotPaged: function (getData) {
      // count >> -1 means that we we have infinity pages
      // counts >> [] means that we hide page size controls
      return new ngTableParams(
        {
          count: -1
        },
        {
          counts: [],
          total: 0,
          getData: function ($defer, params) {
            return getData($defer, params);
          }
        });
    },

    createPaged: function (getData, sorting) {
      var tableSorting = {};
      if (helpers.objects.isNotEmpty(sorting)) {
        tableSorting = {
          sorting: sorting
        };
      }

      var tableParameters = angular.extend({},
        tableSorting, PAGINATION_COUNTERS, $location.search());

      return new ngTableParams(
        tableParameters,
        {
          total: 0,
          getData: function ($defer, params) {
            $location.search(params.url());
            return getData($defer, params);
          }
        });
    }
  };
});
