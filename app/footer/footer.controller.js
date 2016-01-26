(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .controller('FooterController', FooterController);

  FooterController.$inject = [
    '$location', '$route',
    'LoginUtils'
  ];

  function FooterController($location, $route,
                            LoginUtils) {
    var vm = this;
    vm.user = {};

    vm.login = function (user) {
      LoginUtils.login(user)
          .then(function () {
            if ($location.path() != '/home') { return $location.path('/home'); }

            $route.reload();
          }, function (err) {
            var notification = (err.status == 401 ) ? 'Невірно вказано логін|пароль' : 'непонятно';

            $mdToast.show(
                $mdToast.simple()
                    .textContent(notification)
                    .hideDelay(3000)
            );
          });
    };

    vm.userCheck = function () {
      return LoginUtils.isLogged();
    }
  }
})();
