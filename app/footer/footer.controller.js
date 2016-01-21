(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .controller('FooterController', FooterController);

  FooterController.$inject = [
    '$log', '$location',
    'LoginUtils'
  ];

  function FooterController($log, $location,
                            LoginUtils) {
    var vm = this;
    vm.login = function (user) {
      LoginUtils.login(user)
          .then(function () {
            $location.path('/profile');
          }, function (err) {
            $log.log('[ERROR] FooterController.login().LoginUtils.login()', err);
          });
    };

    vm.userCheck = function () {
      return LoginUtils.isLogged();
    }
  }
})();
