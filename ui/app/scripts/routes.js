'use strict';

angular.module('todo-app')
  .config(function ($routeProvider, $routeSegmentProvider) {

    $routeSegmentProvider
      .when('/logged/todos', 'logged.todos')
      .when('/logged/todo-details/:id', 'logged.todo-details')
      //logged user part
      .segment('logged', {
        templateUrl: 'views/private/segment.html'
      })
      .within()
      .segment('todos', {
        templateUrl: 'views/private/todos.html',
        controllerAs: 'ctrl',
        controller: 'TodoListController',
        resolve: {
          todos: function(TodoResource){
            return TodoResource.query({});
          }
        }
      })
      //.segment('todo-details', {
      //  templateUrl: 'views/private/todo-details.html',
      //  controllerAs: 'ctrl',
      //  controller: 'TodoController',
      //  resolve: {
      //    detail: function (TodoResource, $route) {
      //      if ($route.current.params.id !== 'new') {
      //        return TodoResource.get($route.current.params.id);
      //      } else {
      //        return TodoResource.$new();
      //      }
      //    }
      //  }
      //})
      .up();

    $routeProvider.otherwise({
      redirectTo: '/logged/todos'
    });

  });
