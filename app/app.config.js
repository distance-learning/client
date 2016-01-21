(function () {
  'use strict';

  angular
      .module('distanceLearning')
      .config(configURL)
      .config(configAuth);

  configURL.$inject = ['$routeProvider'];
  configAuth.$inject = ['$authProvider'];

  function configURL($routeProvider) {
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
          template: '<profile></profile>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .otherwise({
          redirectTo: '/home'
        });
  }

  function configAuth($authProvider) {
    $authProvider.baseUrl = 'http://distance-learning.herokuapp.com/';
    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/registration';
    $authProvider.tokenName = 'token';
    $authProvider.storageType = 'sessionStorage';
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

})();
