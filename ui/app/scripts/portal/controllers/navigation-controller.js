angular.module('todo-app').controller('NavigationController', function ($scope, $rootScope, pageNavigation) {

  $scope.openTodoList = function(){
    pageNavigation.openTodoList();
  };

});
