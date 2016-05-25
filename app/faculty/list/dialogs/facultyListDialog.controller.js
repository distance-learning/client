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
    vm.newFaculty = {
      name: '',
      description: '',
      examinations: []
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.removeFaculty = function () {
      $mdDialog.hide();
    };

    vm.createFaculty = function () {
      $mdDialog.hide(vm.newFaculty);
    };
  }
})();
