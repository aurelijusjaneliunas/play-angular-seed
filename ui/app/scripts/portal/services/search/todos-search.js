angular.module('todo-app').service('todosSearch', function todosSearch(TodoResource, flash, messagesCatalog) {

  this.executeTodoSearch = function($defer, params){
    var searchPromise = TodoResource.query(params.url());
    searchPromise.then(function (data) {
      if (data) {
        params.total(data.length);
        $defer.resolve(data);
      }
    }, function (data) {
      $defer.resolve([]);
      flash.error(messagesCatalog.getString('error.message.100'));
    });
  };

});
