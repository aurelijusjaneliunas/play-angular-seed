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

  var TABLE_CHANGE_CALLBACK = function(){
    $scope.tableParams.reload();
  };

  this.removeTodo = function(todo){
    todosOperations.deleteTodo(todo, TABLE_CHANGE_CALLBACK);
  };




});
