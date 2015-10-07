'use strict';

angular.module('todo-app', ['ngRoute', 'route-segment', 'view-segment', 'angular-modelizer', 'ui.event', 'ngTable']);

angular.module('todo-app')
  .config(function ($routeSegmentProvider) {

    $routeSegmentProvider.options.autoLoadTemplates = true;
    //append authentication required interceptor
    //$httpProvider.interceptors.push('authenticationRequiredInterceptor');

  });

angular.module('todo-app')
  .run(function ($rootScope, $location, messagesCatalog, pageNavigation, helpers) {

    //make reference to helper methods
    $rootScope.helpers = helpers;

    //message catalog settings
    messagesCatalog.debug = true;

    //login handling
    $rootScope.$next_location = null;
    $rootScope.redirectToLogin = function () {
      $rootScope.$next_location = $location.url();
      pageNavigation.openLogin();
    };

  });
