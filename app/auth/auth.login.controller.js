(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('LoginController', LoginController);

  LoginController.$inject = [
      '$log', '$mdToast',
      'LoginUtils'
  ];

  function LoginController($log, $mdToast,
                           LoginUtils) {
    var vm = this;
    vm.login = function (user) {
      LoginUtils.login(user)
          .then(function (ok) {
            $log.log(ok);
          }, function (err) {
            var notification = (err.status == 401 ) ? 'Невірно вказано логін|пароль' : 'непонятно';
            $mdToast.show(
                $mdToast.simple()
                    .textContent(notification)
                    .hideDelay(3000)
            );
          });
    };
  }
})();
