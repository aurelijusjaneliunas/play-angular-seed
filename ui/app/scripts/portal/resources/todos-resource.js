angular.module('todo-app').factory('TodoResource', function(modelize, API_PATHS) {
    return modelize.defineModel('todo', {
        baseUrl: API_PATHS.TODO_PATHS.TODO_API,
        inactive: false
    });
});
