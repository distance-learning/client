(function () {
  'use strict';

  angular
      .module('distanceLearning.subject')
      .controller('SubjectDialogController', SubjectDialogController);

  SubjectDialogController.$inject = [
    '$mdDialog',
    'subject', 'faculties'
  ];

  function SubjectDialogController($mdDialog,
                                   subject, faculties) {
    var vm = this;
    vm.course = subject;
    vm.faculties = faculties;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancelSubject = function () {
      $mdDialog.cancel();
    };

    vm.removeSubject = function () {
      $mdDialog.hide();
    };

    vm.saveSubject = function (subject) {
      $mdDialog.hide(subject);
    };
  }
})();
