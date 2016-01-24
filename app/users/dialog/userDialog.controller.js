(function () {
  'use strict';

  angular
      .module('distanceLearning.users')
      .controller('UsersDialogController', UsersDialogController);

  UsersDialogController.$inject = [
    '$mdDialog',
    'user'
  ];

  function UsersDialogController($mdDialog,
                                 user) {
    var vm = this;
    vm.user = user;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.removeUser = function () {
      $mdDialog.hide();
    };
  }
})();
