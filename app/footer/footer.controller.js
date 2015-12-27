(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .controller('FooterController', FooterController);

  FooterController.$inject = [
    '$log',
    'LoginUtils'
  ];

  function FooterController($log,
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

    vm.userCheck = function () {
      LoginUtils.isLogged();
    }
  }
})();
