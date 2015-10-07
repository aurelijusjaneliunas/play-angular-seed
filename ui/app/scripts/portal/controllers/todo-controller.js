angular.module('todo-app').controller('TodoController', function ($scope, detail, todosOperations) {
  $scope.todo = detail;

  this.addNewPass = function(){
    if ($scope.passDetailForm.$valid) {
      return todosOperations.addNewPass($scope.plan);
    }
  };

});
