(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$rootScope', '$location',
    'LoginUtils'
  ];

  function LoginController($rootScope, $location,
                           LoginUtils) {
    var vm = this;
    vm.loadingLogin = true;

    vm.login = function (user) {
      vm.loadingLogin = false;

      LoginUtils.login(user)
          .then(function () {
            $location.path('/home');
          }, function (err) {
            var notification = (err.status == 401 ) ? 'Невірно вказано пошту | пароль' : 'непонятно';
            $rootScope.notification(notification);

            vm.loadingLogin = true;
          });
    };
  }
})();
