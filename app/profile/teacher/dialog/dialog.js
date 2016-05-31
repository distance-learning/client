(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileTeacherDialogController', ProfileTeacherDialogController);

  ProfileTeacherDialogController.$inject = [
    '$mdDialog'
  ];

  function ProfileTeacherDialogController($mdDialog) {
    var vm = this;
    vm.date = new Date();

    vm.hide = function() {
      $mdDialog.hide();
    };

    vm.no = function() {
      $mdDialog.cancel();
    };

    vm.ok = function() {
      $mdDialog.hide(vm.date);
    };
  }
})();
