(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .controller('FacultyListDialogController', FacultyListDialogController);

  FacultyListDialogController.$inject = [
    '$mdDialog',
    'faculty'
  ];

  function FacultyListDialogController($mdDialog,
                                       faculty) {
    var vm = this;
    vm.faculty = faculty;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.removeFaculty = function () {
      $mdDialog.hide();
    };

    vm.createFaculty = function (faculty) {
      $mdDialog.hide(faculty);
    };
  }
})();
