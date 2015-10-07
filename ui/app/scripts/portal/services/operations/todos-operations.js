angular.module('todo-app').service('todosOperations', function todosOperations(TodoResource, flash, messagesCatalog) {

  this.deletePasse = function(passe, callback){
    passe.destroy({ wait: true }).then(function(data){
      //TODO add success delete message
      callback();
    }, function(response){
      flash.error(messagesCatalog.getString('error.message.100'));
    });
  };

  this.addNewPass = function(plass){
    //PassResource.$new(pass);
    plass.save().then(function(data){
      //TODO add success delete message
      //callback();
      console.log('Save');
    }, function(response){
      flash.error(messagesCatalog.getString('error.message.100'));
    });
  };
});
