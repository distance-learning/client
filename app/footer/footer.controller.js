(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .controller('FooterController', FooterController);

  FooterController.$inject = [
    '$location', '$route', '$rootScope',
    'LoginUtils'
  ];

  function FooterController($location, $route, $rootScope,
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
            $rootScope.notification(notification);
          });
    };

    vm.userCheck = function () {
      return LoginUtils.isLogged();
    }
  }
})();
