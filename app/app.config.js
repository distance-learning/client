(function () {
  'use strict';

  angular
      .module('distanceLearning')
      .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
        .when('/home', {
          template: '<home></home>'
        })
        .when('/faculty/:slug', {
          template: '<faculty-info></faculty-info>'
        })
        .otherwise({
          redirectTo: '/home'
        });
  }
})();
