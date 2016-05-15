(function () {
  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseDialogController', CourseDialogController);

  CourseDialogController.$inject = [
    '$mdDialog',
    'course'
  ];

  function CourseDialogController($mdDialog,
                                  course) {
    var vm = this;
    vm.course = course;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.removeCourse = function () {
      $mdDialog.hide();
    };
  }
})();
