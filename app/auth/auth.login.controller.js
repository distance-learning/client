(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('LoginController', LoginController);

  LoginController.$inject = [
      '$log',
      'LoginUtils'
  ];

  function LoginController($log,
                           LoginUtils) {
    var vm = this;
    vm.login = function (user) {
      LoginUtils.login(user)
          .then(function (ok) {
            $log.log(ok);
          }, function (err) {
            $log.log(err);
          });
    };
  }
})();
