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
        .when('/reset-password', {
          template: '<reset-pass></reset-pass>'
        })
        .when('/home', {
          template: '<home></home>'
        })
        .when('/faculties', {
          template: '<faculty-info></faculty-info>'
        })
        .when('/profile/admin', {
          template: '<profile-admin></profile-admin>'
        })
        .when('/profile/student', {
          template: '<profile-student></profile-student>'
        })
        .when('/profile/student/reset-password', {
          template: '<profile-reset-password></profile-reset-password>'
        })
        .when('/admin/users', {
          template: '<users></users>'
        })
        .when('/admin/users/info/:slug', {
          template: '<user-page-info></user-page-info>'
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
})();
