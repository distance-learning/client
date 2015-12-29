(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log'];

  function RegisterController($log) {
    var vm = this;
    vm.register = function (user) {
      if (!isValidUser(user)) { return $log.log('[VALIDATION] User date isn`t valid'); }
    };

    function isValidUser (user) {
      return user.password === user.password2;
    }
  }
})();
