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
        .when('/profile/reset-password', {
          template: '<profile-reset-password></profile-reset-password>'
        })
        .when('/profile/change-info', {
          template: '<profile-change-info></profile-change-info>'
        })
        .when('/profile/admin', {
          template: '<profile-admin></profile-admin>'
        })
        .when('/profile/teacher', {
          template: '<profile-teacher></profile-teacher>'
        })
        .when('/profile/student', {
          template: '<profile-student></profile-student>'
        })
        .when('/reset-password/:token', {
          template: '<profile-reset-password></profile-reset-password>'
        })
        .when('/admin/users', {
          template: '<users></users>'
        })
        .when('/admin/users/info/:slug', {
          template: '<user-page-info></user-page-info>'
        })
        .when('/admin/faculties', {
          template: '<faculty-list></faculty-list>'
        })
        .when('/admin/faculties/info/:slug', {
          template: '<faculty-page-info></faculty-page-info>'
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
