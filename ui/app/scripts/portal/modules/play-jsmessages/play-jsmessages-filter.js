angular.module('todo-app').filter('translate', function (messagesCatalog) {
    function filter(input, context) {
        return messagesCatalog.getString(input, null, context);
    }
    filter.$stateful = true;
    return filter;
});
