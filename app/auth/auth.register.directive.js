(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .directive('register', register);

  register.$inject = [];

  function register() {
    return {
      replace: true,
      controller: 'RegisterController',
      controllerAs: 'register',
      templateUrl: 'auth/register.html'
    };
  }
})();