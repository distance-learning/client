(function () {
  'use strict';

  angular
      .module('distanceLearning.footer')
      .controller('FooterController', FooterController);

  FooterController.$inject = ['$log'];

  function FooterController($log) {
    var vm = this;
    vm.login = function (user) {
      $log.log(user);
    }
  }
})();
