angular.module('todo-app').controller('TodoListController', function ($scope, ngTableCreator, locationChangeHandler, todosSearch, todosOperations) {

  //to view on manual location changes like 'browser back button'
  var todoSearchLocationChangeHandler = locationChangeHandler.create({
    onInit: function(){
      $scope.tableParams = ngTableCreator.createNotPaged(function ($defer, params) {
        todosSearch.executeTodoSearch($defer, params);
      });
    },
    onUrlChange: function(searchParameters){
      $scope.tableParams.parameters(searchParameters, true);
    },
    resolveParams: function(){
      return $scope.tableParams.url();
    }
  });
  todoSearchLocationChangeHandler.start();

  var DELETE_CALLBACK = function(){
    $scope.tableParams.reload();
  };

  this.removeTodo = function(passe){
    todosOperations.deleteTodo(passe, DELETE_CALLBACK);
  };


});
