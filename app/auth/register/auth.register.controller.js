(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('RegisterController', RegisterController);

  RegisterController.$inject = [
    '$log', '$location',
    'RegisterUtils'
  ];

  function RegisterController($log, $location,
                              RegisterUtils) {
    var vm = this;
    vm.register = function (user) {
      if (!isValidUser(user)) { return $log.log('[VALIDATION] User date isn`t valid'); }

      RegisterUtils.signUp(user)
          .then(function () {
            $location.path('/profile');
          }, function (err) {
            $log.log('[ERROR] RegisterController.register().LoginUtils.register()', err);
          })
    };

    function isValidUser(user) {
      return user.password === user.password_confirmation;
    }
  }
})();
