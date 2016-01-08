(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .directive('login', login);

  login.$inject = [];

  function login() {
    return {
      replace: true,
      controller: 'LoginController',
      controllerAs: 'login',
      templateUrl: 'auth/login.html'
    };
  }
})();