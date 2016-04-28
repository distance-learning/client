(function () {
  'use strict';

  angular
      .module('distanceLearning.subject')
      .controller('SubjectDialogController', SubjectDialogController);

  SubjectDialogController.$inject = [
    '$mdDialog',
    'subject'
  ];

  function SubjectDialogController($mdDialog,
                                   subject) {
    var vm = this;
    vm.subject = subject;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancelSubject = function () {
      $mdDialog.cancel();
    };

    vm.removeUser = function () {
      $mdDialog.hide();
    };
  }
})();
