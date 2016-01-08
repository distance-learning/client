(function () {
  'use strict';

  angular
      .module('distanceLearning')
      .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
        .when('/login', {
          template: '<login></login>'
        })
        .when('/register', {
          template: '<register></register>'
        })
        .when('/home', {
          template: '<home></home>'
        })
        .when('/faculty/:slug', {
          template: '<faculty-info></faculty-info>'
        })
        .when('/profile', {
          template: '<profile></profile>'
        })
        .otherwise({
          redirectTo: '/home'
        });
  }
})();
