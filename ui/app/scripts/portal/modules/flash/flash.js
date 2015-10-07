angular.module('todo-app').factory("flash", function ($rootScope) {
  var currentMessage = null,
    msgQueue = [];

  $rootScope.$on("$routeChangeSuccess", function () {
    currentMessage = msgQueue.shift() || null;
  });

  //function getMsg(){
  //    return currentMessage || msgQueue.shift() || null;
  //}

  function setMsg(message, queue) {
    if (queue) {
      msgQueue.push(message);
    } else {
      currentMessage = message;
    }
  }

  return {
    clear: function () {
      currentMessage = null;
    },
    error: function (message, queue) {
      setMsg({
        level: 'danger',
        message: message
      }, queue);
    },
    success: function (message, queue) {
      setMsg({
        level: 'success',
        message: message
      }, queue);
    },
    info: function (message, queue) {
      setMsg({
        level: 'info',
        message: message
      }, queue);
    },
    //server: function(data, queue, traverse){
    //    var self = this;
    //    var serverMessages = djangoServerUtils.formatMessages(data);
    //    angular.forEach(serverMessages.globalMessages, function(globalMessage){
    //        self.error(globalMessage, queue);
    //    });
    //    return serverMessages.validationErrors;
    //},
    getMessage: function () {
      return currentMessage;
    }
  };
})

  .directive('flash', function (flash) {
    return {
      templateUrl: 'views/templates/modules/flash/flash.html',
      restrict: 'E',
      replace: true,
      scope: true,
      link: function ($scope) {
        $scope.$watch(flash.getMessage, function () {
          $scope.message = flash.getMessage();
        });
      }
    };
  });
