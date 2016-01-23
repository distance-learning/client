(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UsersController', UsersController);

  UsersController.$inject = [
      'UsersUtils'
  ];

  function UsersController(UsersUtils) {
    var vm = this;

    UsersUtils.getUsers({ page: 1 })
        .then(function (ok) {
          console.log('ok ctrl', ok);
        })
  }
})();
