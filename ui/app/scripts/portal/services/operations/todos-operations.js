angular.module('todo-app').service('todosOperations', function todosOperations(TodoResource, flash, messagesCatalog) {

  this.deleteTodo = function(todo, callback){
    todo.destroy({ wait: true }).then(function(data){
      callback();
    }, function(response){
      flash.error(messagesCatalog.getString('error.message.100'));
    });
  };

  this.addTodo = function(todo, callback){
    var newTodo = TodoResource.$new(todo);
    newTodo.save().then(function(data){
      callback();
    }, function(response){
      flash.error(messagesCatalog.getString('error.message.100'));
    });
  };

});
