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
        .when('/faculties', {
          template: '<faculty-info></faculty-info>'
        })
        .when('/profile', {
          template: '<profile></profile>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/profile/admin', {
          template: '<profile-admin></profile-admin>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/profile/student', {
          template: '<profile-student></profile-student>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/admin/users', {
          template: '<users></users>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/admin/users/info/:slug', {
          template: '<user-page-info></user-page-info>',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .otherwise({
          redirectTo: '/home'
        });
  }

  function configAuth($authProvider) {
    $authProvider.httpInterceptor = function() { return true; };
    $authProvider.baseUrl = 'http://distance-learning.herokuapp.com/';
    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/registration';
    $authProvider.tokenName = 'token';
    $authProvider.storageType = 'sessionStorage';
    $authProvider.authToken = 'Bearer';
    $authProvider.authHeader = 'Authorization';
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
