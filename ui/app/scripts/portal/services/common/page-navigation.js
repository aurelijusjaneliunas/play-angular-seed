angular.module('todo-app').factory('pageNavigation', function pageNavigation($routeSegment, $location) {
  var openLocation = function (url){
    if (url){
      $location.url(url);
    }
  };

  var openSegment = function (segmentName, params){
    if (!params)  {
      openLocation($routeSegment.getSegmentUrl(segmentName));
    } else {
      openLocation($routeSegment.getSegmentUrl(segmentName, params));
    }
  };

  return {
    openPlanDetails: function(todo){
      openSegment('logged.todo-details', {id: todo.id});
    },
    openPasses: function(){
      openSegment('logged.todos');
    }
  };

});
