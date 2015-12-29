(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('RegisterController', RegisterController);

  RegisterController.$inject = [
    '$log',
    'LoginUtils'
  ];

  function RegisterController($log,
                              LoginUtils) {
    var vm = this;
    vm.register = function (user) {
      if (!isValidUser(user)) { return $log.log('[VALIDATION] User date isn`t valid'); }

      LoginUtils.register(user)
          .then(function (ok) {
            $log.log('[OK] RegisterController.register().LoginUtils.register()', ok);
          }, function (err) {
            $log.log('[ERROR] RegisterController.register().LoginUtils.register()', err);
          })
    };

    function isValidUser(user) {
      return user.password === user.password2;
    }
  }
})();
