angular.module('todo-app').controller('TodoController', function ($scope, todosOperations) {

  $scope.model = {
    description: null
  };

  $scope.addTodo = function(){
    todosOperations.addTodo($scope.model);
  };

});
