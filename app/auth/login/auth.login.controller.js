(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('LoginController', LoginController);

  LoginController.$inject = [
      '$mdToast', '$location',
      'LoginUtils'
  ];

  function LoginController($mdToast, $location,
                           LoginUtils) {
    var vm = this;
    vm.login = function (user) {
      LoginUtils.login(user)
          .then(function () {
            $location.path('/home');
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