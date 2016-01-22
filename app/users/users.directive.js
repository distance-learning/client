(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .directive('users', users);

  users.$inject = [];

  function users() {
    return {
      replace: true,
      controller: 'UsersController',
      controllerAs: 'users',
      templateUrl: './users/users.html'
    };
  }
})();
