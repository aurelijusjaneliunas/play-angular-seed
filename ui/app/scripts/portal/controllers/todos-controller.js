angular.module('todo-app').controller('TodoListController', function ($scope, todos, TodoResource, todosOperations) {

  //model list
  $scope.todos = todos;
  //current model
  $scope.model = {
    description: null
  };

  var clearModel = function(){
    $scope.model.description = null;
  };

  var executeSearch = function(){
    $scope.todos = TodoResource.query({}).$future;
  };

  //to view on manual location changes like 'browser back button'
  //var todoSearchLocationChangeHandler = locationChangeHandler.create({
  //  onInit: function(){
  //    $scope.tableParams = ngTableCreator.createNotPaged(function ($defer, params) {
  //      todosSearch.executeTodoSearch($defer, params);
  //    });
  //  },
  //  onUrlChange: function(searchParameters){
  //    $scope.tableParams.parameters(searchParameters, true);
  //  },
  //  resolveParams: function(){
  //    return $scope.tableParams.url();
  //  }
  //});
  //todoSearchLocationChangeHandler.start();

  var REMOVE_CHANGE_CALLBACK = function(){
    executeSearch();
  };

  this.removeTodo = function(todo){
    todosOperations.deleteTodo(todo, REMOVE_CHANGE_CALLBACK);
  };

  var ADD_CALLBACK = function(){
    executeSearch();
    clearModel();
  };

  this.addTodo = function(){
    todosOperations.addTodo($scope.model, ADD_CALLBACK);
  };


});
